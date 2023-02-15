// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

console.log('ola')

import { contextBridge, ipcRenderer } from "electron";
import fs from "fs";
import * as i18nextBackend from "i18next-electron-fs-backend";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Store = require("secure-electron-store").default;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ContextMenu = require("secure-electron-context-menu").default;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const SecureElectronLicenseKeys = require("secure-electron-license-keys");

// Create the electron store to be made available in the renderer process
const store = new Store();

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
export const api = {
  i18nextElectronBackend: i18nextBackend.preloadBindings(ipcRenderer, process),
  store: store.preloadBindings(ipcRenderer, fs),
  contextMenu: ContextMenu.preloadBindings(ipcRenderer),
  licenseKeys: SecureElectronLicenseKeys.preloadBindings(ipcRenderer)
};

contextBridge.exposeInMainWorld("api", api);