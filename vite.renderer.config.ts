import { defineConfig } from 'vite';
import path from 'path';

// https://vitejs.dev/config
export default defineConfig({
  server: {
    host: 'localhost',
    hmr: true,
    port: 40992,
  },
  resolve: {
    alias: {
      '@electron': path.resolve(__dirname, 'app/electron/'),
      '@src': path.resolve(__dirname, 'app/src/'),
      '@localization': path.resolve(__dirname, 'app/localization/'),
    },
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
  },
});
