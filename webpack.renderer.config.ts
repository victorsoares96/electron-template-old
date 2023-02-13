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

if (process.env.NODE_ENV === 'development') {
  plugins.push(
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "app/src/index.html"),
      filename: "temp/index.html",
      cspPlugin: {
        enabled: true,
        policy: {
          "base-uri": ["'self'"],
          "object-src": ["'none'"],
          "script-src": ["'self'"],
          "style-src": ["'self'"],
          "frame-src": ["'none'"],
          "worker-src": ["'none'"]
        },
      },
    })
  )
} else {
  plugins.push(
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "app/src/index.html"),
      hash: true,
      filename: "temp/index.html",
      cspPlugin: {
        enabled: true,
        policy: {
          "base-uri": ["'self'"],
          "object-src": ["'none'"],
          "script-src": ["'self'"],
          "style-src": ["'self'"],
          "frame-src": ["'none'"],
          "worker-src": ["'none'"]
        },
        hashEnabled: {
          "style-src": false
        }
      },
      base: "app://rse"
    })
  )
}


export const rendererConfig: Configuration = {
  module: {
    rules,
  },
  plugins,
  resolve: {
    alias: {
      '@electron': path.resolve(__dirname, 'app/electron/'),
      '@src': path.resolve(__dirname, 'app/src/'),
      '@localization': path.resolve(__dirname, 'app/localization/')
    },
    fallback: {
      "crypto": require.resolve("crypto-browserify"),
      "buffer": require.resolve("buffer/"),
      "path": require.resolve("path-browserify"),
      "stream": require.resolve("stream-browserify")
    },
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
  },
};
