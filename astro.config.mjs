// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

import cloudflare from '@astrojs/cloudflare';

const isCF = process.env.CF === 'true';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],

  vite: {
    plugins: [tailwindcss()],
    ssr: {
      external: ['fs', 'path'],
    },
    build: {
      rollupOptions: {
        onwarn(warning, warn) {
          if (warning.code === 'EVAL') return;
          warn(warning);
        },
      },
    },
  },

  i18n: {
    locales: ['en', 'vi'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: true,
      fallbackType: 'rewrite',
    },
  },

  build: {
    inlineStylesheets: 'auto',
  },

  output: 'static',
  adapter: isCF ? cloudflare({
    imageService: "compile",
  }) : undefined,
});
