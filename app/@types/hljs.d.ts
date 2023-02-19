import { HLJSApi } from 'highlight.js';

declare global {
  // eslint-disable-next-line
  interface Window {
    hljs: HLJSApi;
  }
}
