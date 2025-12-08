// Import Firebase SDK
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { 
    getStorage, 
    ref, 
    uploadBytesResumable, 
    getDownloadURL, 
    listAll,
    deleteObject 
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js';

// Import Firebase configuration
import firebaseConfig from './firebase-config.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// DOM Elements
let imageUpload, uploadBtn, uploadProgress, progressBar, progressText, uploadStatus, gallery, loadImagesBtn;

// Initialize DOM elements when the page loads
document.addEventListener('DOMContentLoaded', () => {
    imageUpload = document.getElementById('imageUpload');
    uploadBtn = document.getElementById('uploadBtn');
    uploadProgress = document.getElementById('uploadProgress');
    progressBar = document.getElementById('progressBar');
    progressText = document.getElementById('progressText');
    uploadStatus = document.getElementById('uploadStatus');
    gallery = document.getElementById('gallery');
    loadImagesBtn = document.getElementById('loadImagesBtn');

    // Event Listeners
    imageUpload.addEventListener('change', handleFileSelect);
    uploadBtn.addEventListener('click', handleUpload);
    loadImagesBtn.addEventListener('click', loadImages);

    // Load images on page load
    loadImages();
});

let selectedFile = null;

// Handle file selection
function handleFileSelect(e) {
    selectedFile = e.target.files[0];
    if (selectedFile) {
        uploadBtn.disabled = false;
        showStatus(`Selected: ${selectedFile.name}`, 'success');
    } else {
        uploadBtn.disabled = true;
        hideStatus();
    }
}

// Handle image upload to Firebase Storage
async function handleUpload() {
    if (!selectedFile) {
        showStatus('Please select an image first', 'error');
        return;
    }

    // Validate file type
    if (!selectedFile.type.startsWith('image/')) {
        showStatus('Please select a valid image file', 'error');
        return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (selectedFile.size > maxSize) {
        showStatus('Image size must be less than 5MB', 'error');
        return;
    }

    uploadBtn.disabled = true;
    uploadProgress.style.display = 'block';

    try {
        // Create a reference to the file location in Firebase Storage
        const timestamp = Date.now();
        const fileName = `${timestamp}_${selectedFile.name}`;
        const storageRef = ref(storage, `images/${fileName}`);

        // Upload file with progress tracking
        const uploadTask = uploadBytesResumable(storageRef, selectedFile);

        uploadTask.on('state_changed',
            (snapshot) => {
                // Track upload progress
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                progressBar.style.width = progress + '%';
                progressText.textContent = Math.round(progress) + '%';
            },
            (error) => {
                // Handle upload error
                console.error('Upload error:', error);
                showStatus(`Upload failed: ${error.message}`, 'error');
                uploadBtn.disabled = false;
                uploadProgress.style.display = 'none';
            },
            async () => {
                // Upload completed successfully
                try {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    showStatus('Image uploaded successfully! ✨', 'success');
                    
                    // Reset form
                    imageUpload.value = '';
                    selectedFile = null;
                    uploadBtn.disabled = true;
                    
                    // Reset progress bar after a delay
                    setTimeout(() => {
                        uploadProgress.style.display = 'none';
                        progressBar.style.width = '0%';
                        progressText.textContent = '0%';
                    }, 2000);

                    // Reload gallery
                    loadImages();
                } catch (error) {
                    console.error('Error getting download URL:', error);
                    showStatus(`Error: ${error.message}`, 'error');
                }
            }
        );
    } catch (error) {
        console.error('Upload error:', error);
        showStatus(`Upload failed: ${error.message}`, 'error');
        uploadBtn.disabled = false;
        uploadProgress.style.display = 'none';
    }
}

// Load all images from Firebase Storage
async function loadImages() {
    loadImagesBtn.disabled = true;
    loadImagesBtn.textContent = 'Loading...';
    gallery.innerHTML = '<div class="empty-gallery">Loading images...</div>';

    try {
        // List all files in the 'images' folder
        const imagesRef = ref(storage, 'images/');
        const result = await listAll(imagesRef);

        if (result.items.length === 0) {
            gallery.innerHTML = '<div class="empty-gallery">No images found. Upload your first spiritual image! 🌟</div>';
            loadImagesBtn.disabled = false;
            loadImagesBtn.textContent = 'Load Images from Firebase';
            return;
        }

        // Clear gallery
        gallery.innerHTML = '';

        // Get download URLs for all images
        const imagePromises = result.items.map(async (itemRef) => {
            try {
                const url = await getDownloadURL(itemRef);
                return {
                    url: url,
                    name: itemRef.name,
                    fullPath: itemRef.fullPath
                };
            } catch (error) {
                console.error(`Error loading image ${itemRef.name}:`, error);
                return null;
            }
        });

        const images = await Promise.all(imagePromises);
        
        // Display images in gallery
        images.filter(img => img !== null).forEach(image => {
            const imageElement = createGalleryItem(image);
            gallery.appendChild(imageElement);
        });

        loadImagesBtn.disabled = false;
        loadImagesBtn.textContent = 'Refresh Gallery';
    } catch (error) {
        console.error('Error loading images:', error);
        gallery.innerHTML = `<div class="empty-gallery">Error loading images: ${error.message}</div>`;
        loadImagesBtn.disabled = false;
        loadImagesBtn.textContent = 'Load Images from Firebase';
    }
}

// Create gallery item element
function createGalleryItem(image) {
    const div = document.createElement('div');
    div.className = 'gallery-item';

    const img = document.createElement('img');
    img.src = image.url;
    img.alt = image.name;
    img.loading = 'lazy';

    const infoDiv = document.createElement('div');
    infoDiv.className = 'image-info';

    const nameSpan = document.createElement('span');
    nameSpan.className = 'image-name';
    nameSpan.textContent = image.name;

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = '🗑️ Delete';
    deleteBtn.onclick = () => deleteImage(image.fullPath);

    infoDiv.appendChild(nameSpan);
    div.appendChild(img);
    div.appendChild(infoDiv);
    div.appendChild(deleteBtn);

    return div;
}

// Delete image from Firebase Storage
async function deleteImage(fullPath) {
    if (!confirm('Are you sure you want to delete this image?')) {
        return;
    }

    try {
        const imageRef = ref(storage, fullPath);
        await deleteObject(imageRef);
        showStatus('Image deleted successfully', 'success');
        loadImages();
    } catch (error) {
        console.error('Error deleting image:', error);
        showStatus(`Delete failed: ${error.message}`, 'error');
    }
}

// Show status message
function showStatus(message, type) {
    uploadStatus.textContent = message;
    uploadStatus.className = `status-message ${type}`;
    uploadStatus.style.display = 'block';

    // Auto-hide success messages after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            hideStatus();
        }, 5000);
    }
}

// Hide status message
function hideStatus() {
    uploadStatus.style.display = 'none';
    uploadStatus.className = 'status-message';
}
