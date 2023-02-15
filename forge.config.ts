import path from 'path';
import fs from 'fs';
import type { ForgeConfig } from '@electron-forge/shared-types';
import { MakerSquirrel } from '@electron-forge/maker-squirrel';
import { MakerZIP } from '@electron-forge/maker-zip';
import { MakerDeb } from '@electron-forge/maker-deb';
import { MakerRpm } from '@electron-forge/maker-rpm';
import { WebpackPlugin } from '@electron-forge/plugin-webpack';

import { mainConfig } from './webpack.main.config';
import { rendererConfig } from './webpack.renderer.config';

const config: ForgeConfig = {
  packagerConfig: {
    asar: true,
    beforeCopy: [
      async (buildPath, electronVersion, platform, arch, callback) => {
        const rendererPath = path.resolve(__dirname, '.webpack/renderer');
        const tempPath = path.resolve(rendererPath, 'temp');
        const main_windowPath = path.resolve(rendererPath, 'main_window');
        const localesPath = path.resolve(__dirname, 'app/localization/locales');

        await fs.promises.unlink(path.resolve(main_windowPath, 'index.html'));
        await fs.promises.rename(path.resolve(tempPath, 'index.html'), path.resolve(main_windowPath, 'index.html'));
        await fs.promises.rmdir(tempPath);
        await fs.promises.rm(path.resolve(main_windowPath, 'temp'), { force: true, recursive: true });
        await fs.promises.cp(localesPath, path.resolve(buildPath, '../localization/locales'), {
          force: true,
          recursive: true
        });

        callback()
      },
    ],
  },
  hooks: {
    /*postPackage: async (_, { outputPaths }) => {
      const rendererPath = path.resolve(__dirname, '.webpack/renderer');
      const tempPath = path.resolve(rendererPath, 'temp');
      const main_windowPath = path.resolve(rendererPath, 'main_window');
      const localesPath = path.resolve(__dirname, 'app/localization/locales');

      await fs.promises.unlink(path.resolve(main_windowPath, 'index.html'));
      await fs.promises.rename(path.resolve(tempPath, 'index.html'), path.resolve(main_windowPath, 'index.html'));
      await fs.promises.rmdir(tempPath);
      await fs.promises.rm(path.resolve(main_windowPath, 'temp'), { force: true, recursive: true });

      for (const outputPath of outputPaths) {
        await fs.promises.rm(path.resolve(outputPath, 'resources/app/.webpack/renderer'), { force: true, recursive: true });
        await fs.promises.cp(rendererPath, path.resolve(outputPath, 'resources/app/.webpack/renderer'), {
          force: true,
          recursive: true
        });
        await fs.promises.cp(localesPath, path.resolve(outputPath, 'resources/app/localization/locales'), {
          force: true,
          recursive: true
        });
      }
    },*/
  },
  rebuildConfig: {},
  makers: [new MakerSquirrel({}), new MakerZIP({}, ['darwin']), new MakerRpm({}), new MakerDeb({})],
  plugins: [
    /*{
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {}
    },*/
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
        // nodeIntegration: false,
        entryPoints: [
          {
            html: './app/src/index.html',
            js: './app/electron/renderer.ts',
            name: 'main_window',
            // nodeIntegration: false,
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
