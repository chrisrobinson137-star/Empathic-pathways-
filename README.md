# 🌟 Empathic Pathways

A spiritual website for sharing and viewing inspirational images using Firebase Storage.

## ✨ Features

- **Upload Images to Firebase Storage**: Share your spiritual journey through images
- **View Image Gallery**: Browse all uploaded images in a beautiful grid layout
- **Delete Images**: Remove images from Firebase Storage
- **Real-time Progress**: Track upload progress with visual feedback
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Firebase Integration**: Secure cloud storage for all your images

## 🚀 Quick Start

1. **Clone the repository**
```bash
git clone https://github.com/chrisrobinson137-star/Empathic-pathways-.git
cd Empathic-pathways-
```

2. **Set up Firebase**
   - Follow the detailed instructions in [FIREBASE_SETUP.md](FIREBASE_SETUP.md)
   - Create a Firebase project
   - Enable Firebase Storage
   - Copy your Firebase configuration

3. **Configure the app**
   - Open `firebase-config.js`
   - Replace the placeholder values with your Firebase configuration

4. **Deploy your site**
   - Use Firebase Hosting, GitHub Pages, Netlify, or any static hosting service
   - Or simply open `index.html` in your browser for local testing

## 📁 Project Structure

```
Empathic-pathways-/
├── index.html          # Main HTML file
├── styles.css          # Styling for the website
├── app.js              # Firebase Storage integration logic
├── firebase-config.js  # Firebase configuration (update with your credentials)
├── FIREBASE_SETUP.md   # Detailed Firebase setup guide
└── README.md           # This file
```

## 🛠️ Technologies Used

- **HTML5**: Structure and content
- **CSS3**: Modern styling with gradients and animations
- **JavaScript (ES6+)**: Application logic and Firebase integration
- **Firebase Storage**: Cloud storage for images
- **Firebase SDK v10**: Latest Firebase JavaScript SDK

## 📖 Usage

### Upload an Image
1. Click the "Choose Image" button
2. Select an image from your computer (max 5MB)
3. Click "Upload to Firebase"
4. Wait for the upload to complete
5. Your image will automatically appear in the gallery

### View Images
1. Click "Load Images from Firebase" to refresh the gallery
2. Images are displayed in a responsive grid
3. Each image shows its filename

### Delete an Image
1. Hover over an image in the gallery
2. Click the "🗑️ Delete" button that appears
3. Confirm the deletion
4. The image will be removed from Firebase Storage

## 🔒 Security

The default configuration allows public read/write access to Firebase Storage for easy setup. For production use, you should:

1. Implement Firebase Authentication
2. Update Storage security rules to require authentication
3. See [FIREBASE_SETUP.md](FIREBASE_SETUP.md) for detailed security instructions

## 🌐 Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📱 Responsive Design

The website is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

## 💡 Customization

You can customize the appearance by editing:
- `styles.css`: Change colors, fonts, and layout
- `index.html`: Modify text and structure
- `app.js`: Add new features or modify existing functionality

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## 📄 License

This project is open source and available for personal and commercial use.

## 🙏 Support

If you need help:
1. Check [FIREBASE_SETUP.md](FIREBASE_SETUP.md) for setup instructions
2. Review the [Firebase Documentation](https://firebase.google.com/docs/storage)
3. Open an issue on GitHub

## 🌈 About

Empathic Pathways is a spiritual platform for sharing inspirational images and connecting through visual storytelling. May your journey be filled with light and love! ✨
