import type { ForgeConfig } from '@electron-forge/shared-types';
import { MakerSquirrel } from '@electron-forge/maker-squirrel';
import { MakerZIP } from '@electron-forge/maker-zip';
import { MakerDeb } from '@electron-forge/maker-deb';
import { MakerRpm } from '@electron-forge/maker-rpm';
import { WebpackPlugin } from '@electron-forge/plugin-webpack';

import { mainConfig } from './webpack.main.config';
import { rendererConfig } from './webpack.renderer.config';
import beforeCopy from './scripts/before-copy';

const config: ForgeConfig = {
  packagerConfig: {
    asar: true,
    beforeCopy: [beforeCopy],
  },
  hooks: {},
  rebuildConfig: {},
  makers: [new MakerSquirrel({}), new MakerZIP({}, ['darwin']), new MakerRpm({}), new MakerDeb({})],
  plugins: [
    new WebpackPlugin({
      devContentSecurityPolicy: `default-src * self blob: data: gap:; style-src * self 'unsafe-inline' blob: data: gap:; script-src * 'self' 'unsafe-eval' 'unsafe-inline' blob: data: gap:; object-src * 'self' blob: data: gap:; img-src * self 'unsafe-inline' blob: data: gap:; connect-src self * 'unsafe-inline' blob: data: gap:; frame-src * self blob: data: gap:;`,
      mainConfig,
      devServer: {
        host: 'localhost',
        hot: true,
        compress: true,
      },
      packageSourceMaps: true,
      port: 40992,
      loggerPort: 40993,
      renderer: {
        config: rendererConfig,
        nodeIntegration: false,
        entryPoints: [
          {
            html: './app/src/index.html',
            js: './app/electron/renderer.ts',
            name: 'main_window',
            nodeIntegration: false,
            preload: {
              js: './app/electron/preload.ts',
            },
          },
        ],
      },
    }),
  ],
};

export default config;
