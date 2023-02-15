/* eslint-disable import/no-named-as-default-member */
import i18next from "i18next";
import backend from 'i18next-fs-backend';
import path from "path";
import fs from 'fs';
import electron from 'electron';

import whitelist from "./whitelist";

// On Mac, the folder for resources isn't
// in the same directory as Linux/Windows;
// https://www.electron.build/configuration/contents#extrafiles
const isMac = process.platform === "darwin";
const isDev = process.env.NODE_ENV === "development";
const prependPath = isMac && !isDev ? path.join(process.resourcesPath, "..") : ".";

fs.writeFileSync(path.resolve(process.cwd(), `log_${Date.now()}.txt`), JSON.stringify('caneta azuuull'))

i18next
  .use(backend)
  .init({
    backend: {
      loadPath: prependPath + "/app/localization/locales/{{lng}}/{{ns}}.json",
      addPath: prependPath + "/app/localization/locales/{{lng}}/{{ns}}.missing.json"
    },
    debug: true,
    ns: "translation",
    saveMissing: true,
    saveMissingTo: "current",
    lng: "en",
    fallbackLng: false, // set to false when generating translation files locally
    supportedLngs: whitelist.langs
  });

export default i18next;