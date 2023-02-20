import type { ResolvedForgeConfig } from '@electron-forge/shared-types';
import path from 'path';
import fs from 'fs';

export async function resolveForgeConfig(
  forgeConfig: ResolvedForgeConfig,
  _currentConfig: ResolvedForgeConfig,
): Promise<ResolvedForgeConfig> {
  const viteFolder = path.resolve(__dirname, '../.vite');

  const isViteFolderExists = fs.existsSync(viteFolder);

  if (!isViteFolderExists) {
    await fs.promises.mkdir(viteFolder);
  }

  return forgeConfig;
}
