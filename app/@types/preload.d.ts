import { api } from '../electron/preload.old';

declare global {
  // eslint-disable-next-line
  interface Window {
    api: typeof api;
  }
}
