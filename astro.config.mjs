// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  fonts: [
      { 
        provider: fontProviders.google(),
        name: 'DM Sans',
        cssVariable: '--font-dm-sans',
        weights: [300, 400, 600, 700],
        styles: ['normal', 'italic'],
        fallbacks: ['sans-serif'],
        display: 'swap',
      }
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});