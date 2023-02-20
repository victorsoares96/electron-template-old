import { defineConfig } from 'vite';
import path from 'path';

// https://vitejs.dev/config
export default defineConfig({
  resolve: {
    alias: {
      '@electron': path.resolve(__dirname, 'app/electron/'),
      '@src': path.resolve(__dirname, 'app/src/'),
      '@localization': path.resolve(__dirname, 'app/localization/'),
    },
    extensions: ['.js', '.ts', '.tsx', '.css', '.json'],
  },
});
