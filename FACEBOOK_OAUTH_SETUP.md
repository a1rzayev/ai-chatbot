# Facebook OAuth Setup Guide

This guide will help you set up Facebook OAuth for your AI Chatbot app.

## Prerequisites

1. A Facebook account
2. Access to Facebook Developers Console

## Step 1: Create a Facebook App

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Click "Create App" or "My Apps" > "Create App"
3. Choose "Consumer" as the app type
4. Fill in the required information:
   - App name: "AI Chatbot"
   - Contact email: Your email
5. Complete the app creation process

## Step 2: Configure Facebook Login

1. In your Facebook app dashboard, go to "Add Product"
2. Find "Facebook Login" and click "Set Up"
3. Choose "Web" as the platform
4. Add your domain to "Valid OAuth Redirect URIs":
   - For development: `https://auth.expo.io/@your-expo-username/ai-chatbot`
   - For production: Your app's redirect URI

## Step 3: Get App Credentials

1. Go to "Settings" > "Basic" in your Facebook app
2. Note down your App ID and App Secret
3. Add your app domain to "App Domains" if needed

## Step 4: Configure Permissions

1. Go to "Facebook Login" > "Settings"
2. Add the following permissions:
   - `public_profile` (default)
   - `email`
3. Save the changes

## Step 5: Update Configuration

1. Open `constants/facebook-auth.ts`
2. Replace the placeholder values:
   ```typescript
   export const FACEBOOK_AUTH_CONFIG = {
     appId: 'YOUR_ACTUAL_FACEBOOK_APP_ID',
     appSecret: 'YOUR_ACTUAL_FACEBOOK_APP_SECRET',
     redirectUri: 'https://auth.expo.io/@your-expo-username/ai-chatbot',
     scopes: ['public_profile', 'email'],
   };
   ```

## Step 6: Environment Variables (Recommended)

For better security, consider using environment variables:

1. Create a `.env` file in your project root:
   ```
   FACEBOOK_APP_ID=your_app_id_here
   FACEBOOK_APP_SECRET=your_app_secret_here
   ```

2. Update the configuration to use environment variables:
   ```typescript
   import Constants from 'expo-constants';
   
   export const FACEBOOK_AUTH_CONFIG = {
     appId: Constants.expoConfig?.extra?.facebookAppId || 'YOUR_APP_ID',
     appSecret: Constants.expoConfig?.extra?.facebookAppSecret || 'YOUR_APP_SECRET',
     redirectUri: 'https://auth.expo.io/@your-expo-username/ai-chatbot',
     scopes: ['public_profile', 'email'],
   };
   ```

## Step 7: Test the Integration

1. Run your app: `npx expo start`
2. Navigate to the login screen
3. Tap "Login with Facebook"
4. You should be redirected to Facebook's OAuth consent screen
5. After successful authentication, you should be redirected back to your app

## Troubleshooting

### Common Issues:

1. **"Invalid redirect URI" error**
   - Make sure the redirect URI in your Facebook app settings matches exactly with the one in your code
   - For Expo development, use the format: `https://auth.expo.io/@your-expo-username/your-app-slug`

2. **"App ID not found" error**
   - Verify that your App ID is correct
   - Make sure your Facebook app is not in development mode if you want to test with other users

3. **"Access blocked" error**
   - Add your email as a test user in the Facebook app settings
   - Make sure your app is not in "Development" mode if you want to publish it

4. **"Permissions error"**
   - Ensure you've requested the correct permissions (`public_profile`, `email`)
   - Check that your app has been approved for the permissions you're requesting

### Security Notes:

- Never commit your App Secret to version control
- Use environment variables for sensitive configuration
- Regularly rotate your OAuth credentials
- Monitor your app usage in Facebook Developers Console

## Production Deployment

When deploying to production:

1. Update the redirect URI to your production domain
2. Remove test users from the app settings
3. Submit your app for review if you plan to make it public
4. Consider implementing additional security measures

## Additional Resources

- [Facebook Login Documentation](https://developers.facebook.com/docs/facebook-login/)
- [Expo WebBrowser Documentation](https://docs.expo.dev/versions/latest/sdk/webbrowser/)
- [Facebook Developers Console](https://developers.facebook.com/) 