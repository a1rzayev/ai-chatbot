export const GOOGLE_AUTH_CONFIG = {
  clientId: 'GOOGLE_CLIENT_ID.apps.googleusercontent.com',
  clientSecret: 'GOOGLE_CLIENT_SECRET',
  redirectUri: 'https://auth.expo.io/@your-expo-username/ai-chatbot',
  scopes: ['openid', 'profile', 'email'],
};

// Google OAuth endpoints
export const GOOGLE_AUTH_ENDPOINTS = {
  authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenEndpoint: 'https://oauth2.googleapis.com/token',
  revocationEndpoint: 'https://oauth2.googleapis.com/revoke',
}; 