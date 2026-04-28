import { defineConfig } from 'astro/config';

/**
 * Hosting note (v0.3.3): site lives at https://agapenursery.com/ (root path).
 * The custom domain is configured via `public/CNAME` (one line: `agapenursery.com`).
 * GitHub Pages reads that file post-deploy, auto-provisions a Let's Encrypt
 * SSL cert, and 301-redirects the *.github.io fallback URL.
 *
 * No `base` is needed anymore — assets resolve from /. The previous
 * /agape-nursery/ project-page subpath is gone.
 */
export default defineConfig({
  site: 'https://agapenursery.com',
  output: 'static',
  build: {
    inlineStylesheets: 'auto',
  },
});
