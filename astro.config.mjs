import { defineConfig } from 'astro/config';

// v0: static output for localhost preview. v1 will switch to:
//   output: 'hybrid', adapter: cloudflare()
// once Cloudflare bindings (R2, KV, Resend secret) are configured.
// PLAN.md §7.1 documents the full topology.
/**
 * Hosting note (v0.3): deploying to GitHub Pages as a project page.
 * Project pages live at `https://<user>.github.io/<repo>/`, so all asset paths
 * must be prefixed with the `base`. Astro's `<a href>`, `<img src>`, and CSS
 * url() are unaffected when relative-to-root, but assets in `public/` must be
 * referenced via `import.meta.env.BASE_URL`.
 */
export default defineConfig({
  site: 'https://ergophobian.github.io',
  base: '/agape-nursery',
  output: 'static',
  build: {
    inlineStylesheets: 'auto',
  },
});
