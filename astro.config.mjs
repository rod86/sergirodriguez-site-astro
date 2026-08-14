// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import icon from 'astro-icon';

export default defineConfig({
  fonts: [
      { 
        provider: fontProviders.google(),
        name: 'Montserrat',
        cssVariable: '--font-montserrat',
        weights: [200, 300, 400, 500, 600, 700, 800],
        styles: ['normal', 'italic'],
        fallbacks: ['sans-serif'],
        display: 'swap',
      }
  ],

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [
      icon({
          include: {
              "simple-icon": ['github', 'linkedin'],
          },
          iconDir: 'src/assets/icons',
      })
  ]
});