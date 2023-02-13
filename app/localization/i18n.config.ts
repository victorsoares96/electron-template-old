/* eslint-disable import/no-named-as-default-member */
import i18next from 'i18next';
import reactI18Next from 'react-i18next';
import i18nBackend from 'i18next-electron-fs-backend';

import whitelist from './whitelist';

// On Mac, the folder for resources isn't
// in the same directory as Linux/Windows;
// https://www.electron.build/configuration/contents#extrafiles
const isMac = window.api.i18nextElectronBackend.clientOptions.platform === "darwin";
const isDev = window.api.i18nextElectronBackend.clientOptions.environment === "development";
const prependPath = isMac && !isDev ? window.api.i18nextElectronBackend.clientOptions.resourcesPath : ".";

i18next
  .use(i18nBackend)
  .use(reactI18Next.initReactI18next)
  .init({
    backend: {
      loadPath: prependPath + "/app/localization/locales/{{lng}}/{{ns}}.json",
      addPath: prependPath + "/app/localization/locales/{{lng}}/{{ns}}.missing.json",
      contextBridgeApiKey: "api" // needs to match first parameter of contextBridge.exposeInMainWorld in preload file; defaults to "api"
    },
    debug: false,
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