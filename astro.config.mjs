import { defineConfig } from 'astro/config';

// v0: static output for localhost preview. v1 will switch to:
//   output: 'hybrid', adapter: cloudflare()
// once Cloudflare bindings (R2, KV, Resend secret) are configured.
// PLAN.md §7.1 documents the full topology.
export default defineConfig({
  site: 'https://agapenurseryandlandscape.com',
  output: 'static',
  build: {
    inlineStylesheets: 'auto',
  },
});
