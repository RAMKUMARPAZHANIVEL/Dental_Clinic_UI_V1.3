// Resizes and converts all treatment images to WebP (max 1200 px wide, quality 75).
// Run once from the repo root: node tools/compress-images.js
// Originals are left untouched. Output files go to the same public/images/ folder.

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const imagesDir = path.join(__dirname, '../public/images');

const images = [
  'periodontics.jpg',
  'tooth_replacement.jpg',
  'braces.jpg',
  'laser_dentistry.jpg',
  'root_canal.jpg',
  'cosmetic.jpg',
  'smile.jpeg',
  'preventive.jpeg',
  'restorative.jpeg',
  'pediatric.jpeg',
  'Banner1.jpeg',
  'rate_us.jpeg',
];

async function compress(filename) {
  const inputPath = path.join(imagesDir, filename);
  const ext = path.extname(filename);
  const basename = path.basename(filename, ext);
  const outputPath = path.join(imagesDir, `${basename}.webp`);

  const before = fs.statSync(inputPath).size;
  await sharp(inputPath)
    .resize(1200, null, { withoutEnlargement: true, fit: 'inside' })
    .webp({ quality: 75 })
    .toFile(outputPath);

  const after = fs.statSync(outputPath).size;
  const pct = Math.round((1 - after / before) * 100);
  console.log(
    `${filename.padEnd(26)} ${(before / 1024 / 1024).toFixed(1).padStart(5)} MB  →  ${basename}.webp  ${(after / 1024).toFixed(0).padStart(5)} KB  (-${pct}%)`
  );
}

(async () => {
  console.log('Compressing images…\n');
  for (const img of images) {
    await compress(img);
  }
  console.log('\nDone.');
})();
