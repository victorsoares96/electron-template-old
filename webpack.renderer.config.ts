import path from 'path';
import type { Configuration } from 'webpack';

import { rules } from './webpack.rules';
import { plugins } from './webpack.plugins';

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
});

rules.push({
  test: /\.svg$/,
  use: ['@svgr/webpack', 'url-loader'],
});

export const rendererConfig: Configuration = {
  module: {
    rules,
  },
  plugins,
  resolve: {
    alias: {
      '@electron': path.resolve(__dirname, 'app/electron/'),
      '@src': path.resolve(__dirname, 'app/src/')
    },
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
  },
};
