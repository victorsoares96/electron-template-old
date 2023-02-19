/* eslint-disable import/no-named-as-default-member */
import i18next from 'i18next';
import backend from 'i18next-fs-backend';
import path from 'path';
import fs from 'fs';
import { app } from 'electron';

import whitelist from './whitelist';

// On Mac, the folder for resources isn't
// in the same directory as Linux/Windows;
// https://www.electron.build/configuration/contents#extrafiles
const isDev = process.env.NODE_ENV === 'development';

const prependPath = isDev
  ? `${app.getAppPath()}/app`
  : `${process.resourcesPath}`;

i18next
  .use(backend)
  /*.use({
    type: 'logger',
    log: (args: any) => fs.writeFileSync(path.resolve(process.cwd(), `${app.name}_i18n_log_${Date.now()}.txt`), JSON.stringify(args)),
    warn: (args: any) => fs.writeFileSync(path.resolve(process.cwd(), `${app.name}_i18n_warn_${Date.now()}.txt`), JSON.stringify(args)),
    error: (args: any) => fs.writeFileSync(path.resolve(process.cwd(), `${app.name}_i18n_error_${Date.now()}.txt`), JSON.stringify(args))
  })*/
  .init({
    backend: {
      loadPath: prependPath + '/localization/locales/{{lng}}/{{ns}}.json',
      addPath:
        prependPath + '/localization/locales/{{lng}}/{{ns}}.missing.json',
    },
    debug: isDev,
    ns: 'translation',
    saveMissing: true,
    saveMissingTo: 'current',
    lng: 'en',
    fallbackLng: false, // set to false when generating translation files locally
    supportedLngs: whitelist.langs,
  });

export default i18next;
