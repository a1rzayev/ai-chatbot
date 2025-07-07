import { GOOGLE_AUTH_CONFIG, GOOGLE_AUTH_ENDPOINTS } from '@/constants/google-auth';
import * as AuthSession from 'expo-auth-session';

export interface GoogleUser {
  id: string;
  email: string;
  name: string;
  picture?: string;
  given_name?: string;
  family_name?: string;
}

export interface GoogleAuthResponse {
  user: GoogleUser;
  accessToken: string;
  idToken: string;
}

class GoogleAuthService {
  private discovery: AuthSession.DiscoveryDocument | null = null;

  async initialize() {
    try {
      this.discovery = await AuthSession.fetchDiscoveryAsync(
        'https://accounts.google.com'
      );
    } catch (error) {
      console.error('Failed to fetch Google discovery document:', error);
      throw error;
    }
  }

  async signIn(): Promise<GoogleAuthResponse> {
    if (!this.discovery) {
      await this.initialize();
    }

    const request = new AuthSession.AuthRequest({
      clientId: GOOGLE_AUTH_CONFIG.clientId,
      scopes: GOOGLE_AUTH_CONFIG.scopes,
      redirectUri: GOOGLE_AUTH_CONFIG.redirectUri,
      responseType: AuthSession.ResponseType.Code,
      additionalParameters: {
        access_type: 'offline',
        prompt: 'consent',
      },
    });

    const result = await request.promptAsync(this.discovery!);

    if (result.type === 'success' && result.params.code) {
      return await this.exchangeCodeForTokens(result.params.code);
    } else {
      throw new Error('Google sign-in was cancelled or failed');
    }
  }

  private async exchangeCodeForTokens(code: string): Promise<GoogleAuthResponse> {
    const tokenRequest = new AuthSession.TokenRequest({
      clientId: GOOGLE_AUTH_CONFIG.clientId,
      clientSecret: GOOGLE_AUTH_CONFIG.clientSecret,
      code,
      redirectUri: GOOGLE_AUTH_CONFIG.redirectUri,
      grantType: AuthSession.GrantType.AuthorizationCode,
    });

    const tokenResult = await tokenRequest.performAsync(this.discovery!);

    if (tokenResult.type === 'success') {
      const userInfo = await this.getUserInfo(tokenResult.accessToken);
      return {
        user: userInfo,
        accessToken: tokenResult.accessToken,
        idToken: tokenResult.idToken || '',
      };
    } else {
      throw new Error('Failed to exchange code for tokens');
    }
  }

  private async getUserInfo(accessToken: string): Promise<GoogleUser> {
    const response = await fetch(
      `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${accessToken}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch user info');
    }

    const userData = await response.json();
    return {
      id: userData.id,
      email: userData.email,
      name: userData.name,
      picture: userData.picture,
      given_name: userData.given_name,
      family_name: userData.family_name,
    };
  }

  async signOut(accessToken?: string) {
    if (accessToken) {
      try {
        await fetch(
          `${GOOGLE_AUTH_ENDPOINTS.revocationEndpoint}?token=${accessToken}`,
          { method: 'POST' }
        );
      } catch (error) {
        console.error('Failed to revoke Google token:', error);
      }
    }
  }
}

export const googleAuthService = new GoogleAuthService(); 