import type { HookFunction } from 'electron-packager';
import path from 'path';
import fs from 'fs';

const beforeCopy: HookFunction = async (buildPath, electronVersion, platform, arch, callback) => {
  const rendererPath = path.resolve(__dirname, '../.webpack/renderer');
  const tempPath = path.resolve(rendererPath, 'temp');
  const main_windowPath = path.resolve(rendererPath, 'main_window');
  const localesPath = path.resolve(__dirname, '../app/localization/locales');

  await fs.promises.unlink(path.resolve(main_windowPath, 'index.html'));
  await fs.promises.rename(path.resolve(tempPath, 'index.html'), path.resolve(main_windowPath, 'index.html'));
  await fs.promises.rmdir(tempPath);
  await fs.promises.rm(path.resolve(main_windowPath, 'temp'), { force: true, recursive: true });
  await fs.promises.cp(localesPath, path.resolve(buildPath, '../localization/locales'), {
    force: true,
    recursive: true
  });

  callback()
};

export default beforeCopy;