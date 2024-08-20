import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Configuring Vite
// https://vitejs.dev/config/

export default defineConfig({
  root: 'src',
  resolve: {
    alias: [
      { find: '@public', replacement: resolve(__dirname, './public') },
      { find: '@server', replacement: resolve(__dirname, './server') },
      { find: '@layout', replacement: resolve(__dirname, './src/layout') },
      { find: '@store', replacement: resolve(__dirname, './src/store') },
      { find: '@styles', replacement: resolve(__dirname, './src/styles') },
      {
        find: '@utilities',
        replacement: resolve(__dirname, './src/utilities'),
      },
    ],
  },
  plugins: [react()],
  publicDir: '../public',
  build: {
    outDir: '../build',
  },
});
