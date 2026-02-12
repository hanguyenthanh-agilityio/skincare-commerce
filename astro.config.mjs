// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';

// @ts-ignore
const isProd = import.meta.env.PROD;

export default defineConfig({
  site: 'https://skincare-commerce.pages.dev',

  integrations: [react({ experimentalReactChildren: true }), sitemap()],

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      conditions: isProd ? ['workerd', 'worker', 'browser'] : ['browser', 'node'],
      alias: isProd
        ? {
            'react-dom/server': 'react-dom/server.edge',
          }
        : {},
    },
    build: {
      rollupOptions: {
        external: ['cloudflare'],
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

  output: 'server',

  adapter: cloudflare({
    // @ts-ignore
    mode: 'directory',
    platformProxy: {
      enabled: true,
      configPath: 'wrangler.json',
      persist: {
        path: './.cache/wrangler/v3',
      },
    },
  }),

  image: {
    service: {
      entrypoint: 'astro/assets/services/compile',
      config: {},
    },
  },

  session: {
    driver: isProd ? 'cloudflare' : 'memory',
  },
});
