import path from 'path';
import type { Configuration } from 'webpack';

import { rules } from './webpack.rules';

export const mainConfig: Configuration = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: './app/electron/main.ts',
  // Put your normal webpack config below here
  module: {
    rules,
  },
  resolve: {
    alias: {
      '@electron': path.resolve(__dirname, 'app/electron/'),
      '@src': path.resolve(__dirname, 'app/src/')
    },
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
  },
};
