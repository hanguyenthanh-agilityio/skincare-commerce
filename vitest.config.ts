/// <reference types="vitest" />
import { getViteConfig } from 'astro/config';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';

export default getViteConfig({
  plugins: [react(), tsconfigPaths()],

  // @ts-expect-error: 'test' is a Vitest config, not a Vite config
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'dist/',
        'src/layouts/**',
        'src/sections/**',
        'src/content/**',
        'src/constants/**',
        'src/types/**',
        'src/schemas/**',
      ],
    },
    exclude: [
      'node_modules',
      'dist',
      'src/layouts/**',
      'src/sections/**',
      'src/content/**',
      'src/constants/**',
      'src/types/**',
      'src/types/product.ts',
      'src/schemas/**',
    ],
  },
});
