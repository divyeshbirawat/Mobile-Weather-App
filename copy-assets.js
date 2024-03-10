import fs from 'fs-extra';

// Define paths
const srcAssetsDir = './src/assets';
const distAssetsDir = './dist/src/assets';

// Copy assets folder from src to dist
fs.copy(srcAssetsDir, distAssetsDir)
  .then(() => {
    console.log('Assets copied successfully!');
  })
  .catch(err => {
    console.error('Error copying assets:', err);
  });
