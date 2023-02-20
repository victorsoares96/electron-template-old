import type { HookFunction } from 'electron-packager';
import path from 'path';
import fs from 'fs';

const beforeCopy: HookFunction = async (
  buildPath,
  electronVersion,
  platform,
  arch,
  callback,
) => {
  const localesPath = path.resolve(__dirname, '../app/localization/locales');

  await fs.promises.cp(
    localesPath,
    path.resolve(buildPath, '../localization/locales'),
    {
      force: true,
      recursive: true,
    },
  );

  callback();
};

export default beforeCopy;
