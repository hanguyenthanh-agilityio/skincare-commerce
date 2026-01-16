import type { StorybookConfig } from '@storybook/react-vite';
import tailwindcss from '@tailwindcss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

// ESM dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config: StorybookConfig = {
  stories: ['../src/ui/**/*.stories.@(ts|tsx|js|jsx)'],

  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-docs',
    '@storybook/addon-onboarding',
    '@storybook/addon-a11y',
    '@storybook/addon-vitest',
  ],

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  async viteFinal(config) {
    /* ------------------ PLUGINS ------------------ */
    config.plugins = config.plugins || [];
    config.plugins.unshift(react());
    config.plugins.push(tailwindcss(), tsconfigPaths());

    /* ------------------ ALIAS ------------------ */
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@': path.resolve(__dirname, '../src'),

      // ✅ MOCK .astro
      '.astro': path.resolve(__dirname, './mocks/empty.ts'),
    };

    /* ------------------ EXTENSIONS ------------------ */
    config.resolve.extensions = ['.tsx', '.ts', '.jsx', '.js', '.json'];

    /* ------------------ OPTIMIZE ------------------ */
    config.optimizeDeps = {
      ...(config.optimizeDeps || {}),
      exclude: ['astro'],
    };

    return config;
  },
};

export default config;
