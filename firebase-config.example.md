# Example Firebase Configuration

This file shows an example of what your Firebase configuration should look like.
DO NOT commit your actual Firebase credentials to version control.

## Example Configuration Structure

```javascript
const firebaseConfig = {
    apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    authDomain: "empathic-pathways.firebaseapp.com",
    projectId: "empathic-pathways",
    storageBucket: "empathic-pathways.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abcdef123456"
};
```

## Where to Find Your Configuration

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click on the gear icon (⚙️) next to "Project Overview"
4. Select "Project settings"
5. Scroll down to "Your apps"
6. Click on the web app icon or "Add app" if you haven't created one
7. Copy the configuration object

## Security Best Practices

- Keep your Firebase configuration secure
- For production apps, consider using environment variables
- Implement Firebase Authentication to protect your storage
- Set up proper security rules in Firebase Console

See [FIREBASE_SETUP.md](FIREBASE_SETUP.md) for complete setup instructions.
