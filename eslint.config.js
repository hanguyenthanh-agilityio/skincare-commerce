import globals from 'globals';

// Core
import js from '@eslint/js';
import prettier from 'eslint-config-prettier';

// TypeScript
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

// React
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';

// Import
import importPlugin from 'eslint-plugin-import';

// Astro
import astroParser from 'astro-eslint-parser';
import astroPlugin from 'eslint-plugin-astro';

// Storybook
import storybook from 'eslint-plugin-storybook';

export default [
  // Ignore
  {
    ignores: ['dist', 'node_modules'],
  },

  // Base JS rules
  js.configs.recommended,

  // Global environment (Browser + Cloudflare Worker)
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.worker, // 👈 Cloudflare Workers
      },
    },
  },

  // TypeScript
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      ...tseslint.configs.recommended.rules,

      // Let TS handle undefined checks
      'no-undef': 'off',
    },
  },

  // React
  {
    files: ['**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}'],
    plugins: {
      react,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
      import: importPlugin,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'no-undef': 'off',
      'no-restricted-imports': 'off',
    },
  },

  // Astro
  {
    files: ['**/*.astro'],
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: tsParser,
        extraFileExtensions: ['.astro'],
      },
    },
    plugins: {
      astro: astroPlugin,
    },
    rules: {
      ...astroPlugin.configs.recommended.rules,
      'react/no-unknown-property': 'off',
    },
  },

  // Storybook
  ...storybook.configs['flat/recommended'],

  // Prettier (must be last)
  prettier,
];
