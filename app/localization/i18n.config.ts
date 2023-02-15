/* eslint-disable import/no-named-as-default-member */
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import i18nBackend from 'i18next-electron-fs-backend';

import whitelist from './whitelist';

// On Mac, the folder for resources isn't
// in the same directory as Linux/Windows;
// https://www.electron.build/configuration/contents#extrafiles
const isMac = window.api.i18nextElectronBackend.clientOptions.platform === "darwin";
const isDev = window.api.i18nextElectronBackend.clientOptions.environment === "development";
// const prependPath = isMac && !isDev ? window.api.i18nextElectronBackend.clientOptions.resourcesPath : ".";
const localesPath = '/usr/lib/electron-template/resources/app' + '/localization/locales'

console.log(window.api.i18nextElectronBackend.clientOptions)

i18next
  .use(i18nBackend)
  .use({
    type: 'logger',
    log: (args: any) => console.log('i18n_log', args),
    warn: (args: any) => console.log('i18n_warn', args),
    error: (args: any) => console.log('i18n_error', args)
  })
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: localesPath + "/{{lng}}/{{ns}}.json",
      addPath: localesPath + "/{{lng}}/{{ns}}.missing.json",
      contextBridgeApiKey: "api" // needs to match first parameter of contextBridge.exposeInMainWorld in preload file; defaults to "api"
    },
    debug: true,
    ns: 'translation',
    saveMissing: true,
    saveMissingTo: "current",
    lng: "en",
    fallbackLng: false, // set to false when generating translation files locally
    supportedLngs: whitelist.langs
  });

window.api.i18nextElectronBackend.onLanguageChange((args: any) => {
  i18next.changeLanguage(args.lng, (error, _t) => {
    if (error) {
      console.error(error);
    }
  });
});

export default i18next;