#!/usr/bin/env node
/**
 * Generate branding assets (favicon, apple-touch-icon, OG share image, manifest)
 * from source SVGs. Run with `node scripts/generate-branding.mjs`.
 *
 * Outputs land in `public/` so Astro picks them up at build time.
 *
 * Required sizes:
 *   favicon-16.png       — Chrome/Firefox tab favicon
 *   favicon-32.png       — Standard favicon
 *   favicon.ico          — Legacy/IE compatibility
 *   apple-touch-icon.png — 180x180, iOS Home Screen + iMessage rich preview
 *   icon-192.png         — Android manifest
 *   icon-512.png         — Android manifest, splash, PWA
 *   og-image.jpg         — 1200x630, FB/iMessage rich-share preview
 */

import sharp from 'sharp';
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SRC = join(ROOT, 'src/assets/branding');
const OUT = join(ROOT, 'public');

mkdirSync(OUT, { recursive: true });

const iconSvg = readFileSync(join(SRC, 'icon-source.svg'));
const ogSvg = readFileSync(join(SRC, 'og-source.svg'));

// PNG icons from icon-source.svg
const iconSizes = [
  { name: 'favicon-16.png', size: 16 },
  { name: 'favicon-32.png', size: 32 },
  { name: 'favicon-48.png', size: 48 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'icon-192.png', size: 192 },
  { name: 'icon-512.png', size: 512 },
];

const tasks = [];

for (const { name, size } of iconSizes) {
  tasks.push(
    sharp(iconSvg, { density: 300 })
      .resize(size, size, { fit: 'cover' })
      .png({ compressionLevel: 9, palette: false })
      .toFile(join(OUT, name))
      .then(() => console.log(`  ✓ ${name} (${size}x${size})`))
  );
}

// Open Graph share image — JPEG for smaller filesize on the network
tasks.push(
  sharp(ogSvg, { density: 200 })
    .resize(1200, 630, { fit: 'cover' })
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(join(OUT, 'og-image.jpg'))
    .then(() => console.log('  ✓ og-image.jpg (1200x630)'))
);

// Twitter card variant — same image works at this aspect ratio
tasks.push(
  sharp(ogSvg, { density: 200 })
    .resize(1200, 630, { fit: 'cover' })
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(join(OUT, 'twitter-card.jpg'))
    .then(() => console.log('  ✓ twitter-card.jpg'))
);

await Promise.all(tasks);

// Web manifest — enables "Install" / "Add to Home Screen" with proper icon + name
const manifest = {
  name: 'Agape Nursery & Landscape',
  short_name: 'Agape',
  description:
    'Family-run nursery and landscape design in Delano, California. Serving Tulare and Kern Counties since 1982.',
  start_url: '/',
  scope: '/',
  display: 'standalone',
  background_color: '#F5EFE3',
  theme_color: '#4A5D3A',
  icons: [
    { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
    { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
    { src: 'icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
  ],
};
writeFileSync(join(OUT, 'site.webmanifest'), JSON.stringify(manifest, null, 2));
console.log('  ✓ site.webmanifest');

// Generate a minimal favicon.ico (16x16 ICO is just a PNG with .ico extension
// that all modern browsers accept). For a proper multi-resolution ICO we'd need
// `to-ico`, but a 32x32 PNG named .ico works in 99% of cases.
await sharp(iconSvg, { density: 300 })
  .resize(32, 32)
  .toFormat('png')
  .toFile(join(OUT, 'favicon.ico'));
console.log('  ✓ favicon.ico');

console.log('\nAll branding assets generated.');
