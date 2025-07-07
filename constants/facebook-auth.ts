export const FACEBOOK_AUTH_CONFIG = {
  appId: 'FACEBOOK_APP_ID',
  appSecret: 'FACEBOOK_APP_SECRET',
  redirectUri: 'https://auth.expo.io/@your-expo-username/ai-chatbot',
  scopes: ['public_profile', 'email'],
};

export const FACEBOOK_AUTH_ENDPOINTS = {
  authorizationEndpoint: 'https://www.facebook.com/v18.0/dialog/oauth',
  tokenEndpoint: 'https://graph.facebook.com/v18.0/oauth/access_token',
  userInfoEndpoint: 'https://graph.facebook.com/v18.0/me',
}; 