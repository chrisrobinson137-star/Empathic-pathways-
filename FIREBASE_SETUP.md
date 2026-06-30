# Firebase Storage Setup Guide for Empathic Pathways

This guide will help you set up Firebase Storage for your Empathic Pathways spiritual website.

## Prerequisites

- A Google account
- A web browser
- Basic understanding of Firebase console

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or "Create a project"
3. Enter your project name (e.g., "Empathic Pathways")
4. Click "Continue"
5. Choose whether to enable Google Analytics (optional)
6. Click "Create project"
7. Wait for the project to be created, then click "Continue"

## Step 2: Set Up Firebase Storage

1. In your Firebase project dashboard, click on "Storage" in the left sidebar
2. Click "Get Started"
3. Review the security rules (we'll configure these later)
4. Click "Next"
5. Select your Cloud Storage location (choose the closest to your users)
6. Click "Done"

## Step 3: Configure Storage Security Rules

1. In Firebase Storage, click on the "Rules" tab
2. Replace the default rules with the following to allow read/write access:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /images/{imageId} {
      // Allow anyone to read images
      allow read: if true;
      // Allow anyone to upload images (you may want to add authentication later)
      allow write: if request.resource.size < 5 * 1024 * 1024 
                   && request.resource.contentType.matches('image/.*');
      // Allow delete for authenticated users or all users (adjust as needed)
      allow delete: if true;
    }
  }
}
```

3. Click "Publish" to save the rules

**Security Note**: The above rules allow anyone to upload, view, and delete images. For production use, you should implement Firebase Authentication and restrict access accordingly.

## Step 4: Get Your Firebase Configuration

1. In your Firebase project dashboard, click on the gear icon (⚙️) next to "Project Overview"
2. Select "Project settings"
3. Scroll down to "Your apps" section
4. Click on the Web icon (`</>`) to add a web app
5. Register your app with a nickname (e.g., "Empathic Pathways Web")
6. Click "Register app"
7. Copy the Firebase configuration object that looks like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};
```

## Step 5: Update Your Configuration File

1. Open the `firebase-config.js` file in your project
2. Replace the placeholder values with your actual Firebase configuration:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

3. Save the file

## Step 6: Deploy Your Website

You can deploy your website using various methods:

### Option A: Firebase Hosting (Recommended)

1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Login to Firebase:
```bash
firebase login
```

3. Initialize Firebase in your project:
```bash
firebase init
```
   - Select "Hosting"
   - Choose your existing project
   - Set public directory as `.` (current directory)
   - Configure as single-page app: No
   - Don't overwrite index.html

4. Deploy:
```bash
firebase deploy
```

### Option B: Other Hosting Providers

You can also use:
- GitHub Pages
- Netlify
- Vercel
- Any web server that supports static files

Just upload the following files:
- `index.html`
- `styles.css`
- `app.js`
- `firebase-config.js`

## Step 7: Test Your Application

1. Open your deployed website in a browser
2. Click "Choose Image" to select an image from your computer
3. Click "Upload to Firebase" to upload the image
4. Wait for the upload to complete
5. Click "Load Images from Firebase" to see all uploaded images
6. You can delete images by hovering over them and clicking the delete button

## Features

### Upload Images
- Select any image file (JPG, PNG, GIF, etc.)
- Maximum file size: 5MB
- Real-time upload progress tracking
- Automatic gallery refresh after upload

### View Images
- Grid gallery layout
- Responsive design for mobile and desktop
- Lazy loading for better performance
- Image names displayed below each image

### Delete Images
- Hover over an image to reveal the delete button
- Confirmation dialog before deletion
- Automatic gallery refresh after deletion

## Security Considerations

The current configuration allows anyone to upload, view, and delete images. For a production application, you should:

1. **Implement Firebase Authentication**:
   - Require users to sign in before uploading/deleting
   - Only allow viewing for public users

2. **Update Security Rules**:
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /images/{imageId} {
      allow read: if true;
      allow write: if request.auth != null
                   && request.resource.size < 5 * 1024 * 1024
                   && request.resource.contentType.matches('image/.*');
      allow delete: if request.auth != null;
    }
  }
}
```

3. **Add User Metadata**:
   - Store who uploaded each image
   - Only allow users to delete their own images

## Troubleshooting

### Images not uploading
- Check your Firebase configuration in `firebase-config.js`
- Verify your Storage security rules
- Check browser console for error messages
- Ensure file size is under 5MB

### Images not displaying
- Check if Firebase Storage has images in the `images/` folder
- Verify your Storage security rules allow read access
- Check browser console for CORS errors

### Permission denied errors
- Review your Storage security rules
- Make sure the rules are published
- Wait a few minutes for rules to propagate

## Cost Considerations

Firebase offers a generous free tier:
- **Storage**: 5 GB free
- **Downloads**: 1 GB/day free
- **Uploads**: 20K/day free

Monitor your usage in the Firebase Console under "Usage and billing".

## Support

For more information, visit:
- [Firebase Storage Documentation](https://firebase.google.com/docs/storage)
- [Firebase Security Rules](https://firebase.google.com/docs/storage/security)
- [Firebase Pricing](https://firebase.google.com/pricing)
