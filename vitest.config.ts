import path from 'path';
import topLevelAwait from 'vite-plugin-top-level-await';
import wasmPlugin from 'vite-plugin-wasm';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [wasmPlugin(), topLevelAwait()],
  test: {
    environment: 'node',
    globals: true,
    include: ['test/**/*.test.ts', 'test/**/*.test.tsx'],
    exclude: ['**/dist/**', '**/node_modules/**', '**/target/**'],
  },
  optimizeDeps: {
    exclude: ['@jsquash/png'],
  },
  resolve: {
    alias: {
      '@libwebp': path.join(__dirname, 'wasm/libwebp/libwebp.js'),
    },
  },
});
