import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'
import eslintPlugin from '@nabla/vite-plugin-eslint';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), eslintPlugin()],
  base: '',
  root: 'src',
  build: {
    outDir: '../dist',
    target: 'esnext',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 8080
  },
  preview: {
    port: 8080
  },
  publicDir: './public',
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    dir: './src',
    coverage: {
      reporter: ['lcov', 'cobertura', 'text'],
      provider: 'c8',
    },
    reporters: ['default', 'junit'],
    outputFile: './junit.xml',
  },
})