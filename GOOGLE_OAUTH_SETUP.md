# Google OAuth Setup Guide

This guide will help you set up Google OAuth for your AI Chatbot app.

## Prerequisites

1. A Google account
2. Access to Google Cloud Console

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API and Google OAuth2 API

## Step 2: Configure OAuth Consent Screen

1. In the Google Cloud Console, go to "APIs & Services" > "OAuth consent screen"
2. Choose "External" user type (unless you have a Google Workspace account)
3. Fill in the required information:
   - App name: "AI Chatbot"
   - User support email: Your email
   - Developer contact information: Your email
4. Add the following scopes:
   - `openid`
   - `profile`
   - `email`
5. Add test users if needed (for development)

## Step 3: Create OAuth 2.0 Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth 2.0 Client IDs"
3. Choose "Web application" as the application type
4. Add authorized redirect URIs:
   - For development: `https://auth.expo.io/@your-expo-username/ai-chatbot`
   - For production: Your app's redirect URI
5. Note down the Client ID and Client Secret

## Step 4: Update Configuration

1. Open `constants/google-auth.ts`
2. Replace the placeholder values:
   ```typescript
   export const GOOGLE_AUTH_CONFIG = {
     clientId: 'YOUR_ACTUAL_CLIENT_ID.apps.googleusercontent.com',
     clientSecret: 'YOUR_ACTUAL_CLIENT_SECRET',
     redirectUri: 'https://auth.expo.io/@your-expo-username/ai-chatbot',
     scopes: ['openid', 'profile', 'email'],
   };
   ```

## Step 5: Environment Variables (Recommended)

For better security, consider using environment variables:

1. Create a `.env` file in your project root:
   ```
   GOOGLE_CLIENT_ID=your_client_id_here
   GOOGLE_CLIENT_SECRET=your_client_secret_here
   ```

2. Install expo-constants if not already installed:
   ```bash
   npx expo install expo-constants
   ```

3. Update the configuration to use environment variables:
   ```typescript
   import Constants from 'expo-constants';
   
   export const GOOGLE_AUTH_CONFIG = {
     clientId: Constants.expoConfig?.extra?.googleClientId || 'YOUR_CLIENT_ID',
     clientSecret: Constants.expoConfig?.extra?.googleClientSecret || 'YOUR_CLIENT_SECRET',
     redirectUri: 'https://auth.expo.io/@your-expo-username/ai-chatbot',
     scopes: ['openid', 'profile', 'email'],
   };
   ```

## Step 6: Test the Integration

1. Run your app: `npx expo start`
2. Navigate to the login screen
3. Tap "Login with Google"
4. You should be redirected to Google's OAuth consent screen
5. After successful authentication, you should be redirected back to your app

## Troubleshooting

### Common Issues:

1. **"Invalid redirect URI" error**
   - Make sure the redirect URI in your Google Cloud Console matches exactly with the one in your code
   - For Expo development, use the format: `https://auth.expo.io/@your-expo-username/your-app-slug`

2. **"Client ID not found" error**
   - Verify that your Client ID is correct
   - Make sure you've enabled the necessary APIs in Google Cloud Console

3. **"Access blocked" error**
   - Add your email as a test user in the OAuth consent screen
   - Make sure your app is not in "Testing" mode if you want to publish it

### Security Notes:

- Never commit your Client Secret to version control
- Use environment variables for sensitive configuration
- Regularly rotate your OAuth credentials
- Monitor your OAuth usage in Google Cloud Console

## Production Deployment

When deploying to production:

1. Update the redirect URI to your production domain
2. Remove test users from the OAuth consent screen
3. Submit your app for verification if you plan to make it public
4. Consider implementing additional security measures like PKCE

## Additional Resources

- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Expo AuthSession Documentation](https://docs.expo.dev/versions/latest/sdk/auth-session/)
- [Google Cloud Console](https://console.cloud.google.com/) 