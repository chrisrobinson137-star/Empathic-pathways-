# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Create Firebase Project (2 minutes)
1. Visit https://console.firebase.google.com/
2. Click "Add project"
3. Name it "Empathic Pathways" and follow the wizard

### Step 2: Enable Firebase Storage (1 minute)
1. In Firebase Console, click "Storage" in the left menu
2. Click "Get Started" 
3. Click through the security rules dialog
4. Choose your storage location
5. Click "Done"

### Step 3: Get Your Config (1 minute)
1. Click the gear icon ⚙️ next to "Project Overview"
2. Click "Project settings"
3. Scroll to "Your apps" and click the `</>` web icon
4. Register app with any nickname
5. Copy the `firebaseConfig` object

### Step 4: Update Your Code (1 minute)
1. Open `firebase-config.js` in this repository
2. Paste your Firebase config values
3. Save the file

### Step 5: Open and Use! (immediate)
1. Open `index.html` in a web browser
2. Click "Choose Image" and select a photo
3. Click "Upload to Firebase"
4. Watch your image appear in the gallery! ✨

## 🎯 That's It!

You now have a working Firebase Storage application!

## 📚 Need More Help?

- See [FIREBASE_SETUP.md](FIREBASE_SETUP.md) for detailed instructions
- See [README.md](README.md) for full documentation

## 🔐 Security Note

The default setup allows anyone to upload/delete images. For production:
1. Enable Firebase Authentication
2. Update Storage Rules (see FIREBASE_SETUP.md)

## ☁️ Want to Deploy Online?

### Easy Deploy with Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

Your site will be live at: `https://your-project.web.app`

## 💡 Features

- ✅ Upload images (max 5MB)
- ✅ View all images in a gallery
- ✅ Delete images
- ✅ Real-time upload progress
- ✅ Responsive mobile design
- ✅ Beautiful spiritual theme

Enjoy your spiritual image gallery! 🌟
