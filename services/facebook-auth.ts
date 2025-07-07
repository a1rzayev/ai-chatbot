import { FACEBOOK_AUTH_CONFIG, FACEBOOK_AUTH_ENDPOINTS } from '@/constants/facebook-auth';
import * as Crypto from 'expo-crypto';
import * as WebBrowser from 'expo-web-browser';

export interface FacebookUser {
  id: string;
  email: string;
  name: string;
  picture?: string;
  first_name?: string;
  last_name?: string;
}

export interface FacebookAuthResponse {
  user: FacebookUser;
  accessToken: string;
}

class FacebookAuthService {
  async signIn(): Promise<FacebookAuthResponse> {
    // Generate a random state parameter for security
    const state = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      Math.random().toString(),
      { encoding: Crypto.CryptoEncoding.HEX }
    );

    // Create the authorization URL
    const authUrl = new URL(FACEBOOK_AUTH_ENDPOINTS.authorizationEndpoint);
    authUrl.searchParams.append('client_id', FACEBOOK_AUTH_CONFIG.appId);
    authUrl.searchParams.append('redirect_uri', FACEBOOK_AUTH_CONFIG.redirectUri);
    authUrl.searchParams.append('scope', FACEBOOK_AUTH_CONFIG.scopes.join(','));
    authUrl.searchParams.append('response_type', 'code');
    authUrl.searchParams.append('state', state);

    // Open the browser for authentication
    const result = await WebBrowser.openAuthSessionAsync(
      authUrl.toString(),
      FACEBOOK_AUTH_CONFIG.redirectUri
    );

    if (result.type === 'success' && result.url) {
      const url = new URL(result.url);
      const code = url.searchParams.get('code');
      const returnedState = url.searchParams.get('state');

      if (!code) {
        throw new Error('Authorization code not received');
      }

      if (returnedState !== state) {
        throw new Error('State parameter mismatch');
      }

      return await this.exchangeCodeForTokens(code);
    } else {
      throw new Error('Facebook sign-in was cancelled or failed');
    }
  }

  private async exchangeCodeForTokens(code: string): Promise<FacebookAuthResponse> {
    // Exchange the authorization code for an access token
    const tokenUrl = new URL(FACEBOOK_AUTH_ENDPOINTS.tokenEndpoint);
    tokenUrl.searchParams.append('client_id', FACEBOOK_AUTH_CONFIG.appId);
    tokenUrl.searchParams.append('client_secret', FACEBOOK_AUTH_CONFIG.appSecret);
    tokenUrl.searchParams.append('code', code);
    tokenUrl.searchParams.append('redirect_uri', FACEBOOK_AUTH_CONFIG.redirectUri);

    const tokenResponse = await fetch(tokenUrl.toString(), {
      method: 'GET',
    });

    if (!tokenResponse.ok) {
      throw new Error('Failed to exchange code for access token');
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    if (!accessToken) {
      throw new Error('Access token not received');
    }

    // Get user information using the access token
    const userInfo = await this.getUserInfo(accessToken);

    return {
      user: userInfo,
      accessToken,
    };
  }

  private async getUserInfo(accessToken: string): Promise<FacebookUser> {
    const userInfoUrl = new URL(FACEBOOK_AUTH_ENDPOINTS.userInfoEndpoint);
    userInfoUrl.searchParams.append('access_token', accessToken);
    userInfoUrl.searchParams.append('fields', 'id,name,email,first_name,last_name,picture');

    const response = await fetch(userInfoUrl.toString());

    if (!response.ok) {
      throw new Error('Failed to fetch user info');
    }

    const userData = await response.json();
    return {
      id: userData.id,
      email: userData.email,
      name: userData.name,
      first_name: userData.first_name,
      last_name: userData.last_name,
      picture: userData.picture?.data?.url,
    };
  }

  async signOut(accessToken?: string) {
    if (accessToken) {
      try {
        const logoutUrl = new URL('https://graph.facebook.com/v18.0/me/permissions');
        logoutUrl.searchParams.append('access_token', accessToken);
        
        await fetch(logoutUrl.toString(), { method: 'DELETE' });
      } catch (error) {
        console.error('Failed to revoke Facebook permissions:', error);
      }
    }
  }
}

export const facebookAuthService = new FacebookAuthService(); 