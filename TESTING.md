# Testing Guide for Empathic Pathways

This guide helps you test the Firebase Storage integration.

## Prerequisites for Testing

Before testing, make sure you have:
- ✅ Created a Firebase project
- ✅ Enabled Firebase Storage
- ✅ Updated `firebase-config.js` with your credentials
- ✅ Set up Storage security rules

## Manual Testing Checklist

### 1. Initial Load Test
- [ ] Open `index.html` in a web browser
- [ ] Verify the page loads without errors (check browser console with F12)
- [ ] Verify the spiritual theme displays correctly
- [ ] Check that the upload section is visible
- [ ] Check that the gallery section is visible

### 2. Image Upload Test
- [ ] Click "Choose Image" button
- [ ] Select a valid image file (JPG, PNG, GIF)
- [ ] Verify "Upload to Firebase" button becomes enabled
- [ ] Click "Upload to Firebase"
- [ ] Verify progress bar appears and fills to 100%
- [ ] Verify success message appears: "Image uploaded successfully! ✨"
- [ ] Check browser console for any errors

### 3. Image Display Test
- [ ] Click "Load Images from Firebase" button
- [ ] Verify button text changes to "Loading..."
- [ ] Wait for images to load
- [ ] Verify uploaded image(s) appear in the gallery grid
- [ ] Verify image names are displayed below each image
- [ ] Check that images are displayed correctly

### 4. Image Delete Test
- [ ] Hover over an image in the gallery
- [ ] Verify delete button (🗑️ Delete) appears
- [ ] Click the delete button
- [ ] Verify confirmation dialog appears
- [ ] Click "OK" to confirm deletion
- [ ] Verify image is removed from the gallery
- [ ] Verify success message appears

### 5. Error Handling Tests

#### Test Invalid File Type
- [ ] Try to select a non-image file (PDF, TXT, etc.)
- [ ] Verify appropriate error message appears

#### Test Large File
- [ ] Try to upload an image larger than 5MB
- [ ] Verify error message: "Image size must be less than 5MB"

#### Test Upload Without Selection
- [ ] Without selecting a file, try to click upload (button should be disabled)
- [ ] Verify button remains disabled until file is selected

### 6. Responsive Design Test
- [ ] Resize browser window to mobile size (< 768px width)
- [ ] Verify layout adjusts properly
- [ ] Verify gallery grid adapts to smaller screen
- [ ] Test on actual mobile device if possible

### 7. Multiple Upload Test
- [ ] Upload multiple images one after another
- [ ] Verify each upload completes successfully
- [ ] Verify all images appear in the gallery
- [ ] Verify gallery updates after each upload

### 8. Browser Compatibility Test
Test in multiple browsers:
- [ ] Chrome
- [ ] Firefox
- [ ] Safari (if on Mac)
- [ ] Edge

## Automated Testing (Developer)

For developers who want to add automated tests:

### Suggested Test Framework
- Jest for unit tests
- Cypress or Playwright for E2E tests

### Test Areas to Cover
1. Firebase initialization
2. File upload functionality
3. Image retrieval from Storage
4. Image deletion
5. Error handling
6. UI state management

## Common Issues and Solutions

### Issue: "Firebase not defined" error
**Solution**: Check that `firebase-config.js` is properly configured and imported

### Issue: Images not uploading
**Solution**: 
- Verify Firebase Storage is enabled
- Check Storage security rules
- Check browser console for specific errors

### Issue: "Permission denied" error
**Solution**: Update Firebase Storage rules to allow write access

### Issue: Images not displaying
**Solution**:
- Check Storage security rules allow read access
- Verify images exist in Firebase Console > Storage > images/
- Check for CORS errors in browser console

### Issue: Progress bar stuck at 0%
**Solution**:
- Check internet connection
- Verify file size is under 5MB
- Check Firebase Storage quota

## Performance Testing

### Load Time Test
- [ ] Open browser DevTools Network tab
- [ ] Refresh page
- [ ] Verify page loads in < 2 seconds
- [ ] Check Firebase SDK loads properly

### Image Loading Test
- [ ] Upload 10 images
- [ ] Click "Load Images from Firebase"
- [ ] Verify all images load within 5 seconds
- [ ] Check that lazy loading works (images load as they scroll into view)

## Security Testing

### Current Setup (Development)
⚠️ The default configuration allows public access. Test that:
- [ ] Anyone can upload images
- [ ] Anyone can view images
- [ ] Anyone can delete images

### Production Setup (After Authentication)
If you've implemented authentication, test that:
- [ ] Unauthenticated users cannot upload
- [ ] Unauthenticated users cannot delete
- [ ] All users can view images
- [ ] Users can only delete their own images

## Firebase Console Verification

### Storage Check
1. Open Firebase Console
2. Go to Storage
3. Navigate to the `images/` folder
4. Verify:
   - [ ] Uploaded images are present
   - [ ] File names include timestamps
   - [ ] File sizes are correct
   - [ ] Deleted images are removed

### Usage Monitoring
1. Go to Firebase Console > Storage > Usage
2. Check:
   - [ ] Storage usage is within limits
   - [ ] Number of downloads is tracked
   - [ ] Number of uploads is tracked

## Test Results Template

```
Date: ___________
Tester: ___________
Browser: ___________

✅ Initial Load: PASS / FAIL
✅ Image Upload: PASS / FAIL
✅ Image Display: PASS / FAIL
✅ Image Delete: PASS / FAIL
✅ Error Handling: PASS / FAIL
✅ Responsive Design: PASS / FAIL

Notes:
_________________________________
_________________________________
_________________________________
```

## Next Steps After Testing

If all tests pass:
- ✅ Your Firebase Storage integration is working!
- 🚀 Consider adding authentication for production
- 📝 Update security rules for production use
- 🌐 Deploy your site to Firebase Hosting or another platform

If tests fail:
- 📋 Review error messages in browser console
- 📖 Check [FIREBASE_SETUP.md](FIREBASE_SETUP.md) for configuration help
- 🔍 Verify Firebase configuration in `firebase-config.js`
- 💬 Open an issue on GitHub with error details
