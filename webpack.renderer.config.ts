import path from 'path';
import type { Configuration } from 'webpack';

import { rules } from './webpack.rules';
import { plugins } from './webpack.plugins';
import HtmlWebpackPlugin from 'html-webpack-plugin';

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
  /*plugins: [...plugins, process.env.NODE_ENV !== 'development' ? new HtmlWebpackPlugin({
    template: path.resolve(__dirname, "app/src/index.html"),
    // filename: "main_window/indexxx.html",
    base: "app://rse"
  }) : new HtmlWebpackPlugin({
    template: path.resolve(__dirname, "app/src/index.html"),
    filename: "index.html",
  })],*/
  plugins,
  resolve: {
    alias: {
      '@electron': path.resolve(__dirname, 'app/electron/'),
      '@src': path.resolve(__dirname, 'app/src/')
    },
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
  },
};
