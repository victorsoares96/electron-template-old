/*
Reasonably Secure Electron
Copyright (C) 2021  Bishop Fox
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
-------------------------------------------------------------------------
Implementing a custom protocol achieves two goals:
  1) Allows us to use ES6 modules/targets for Angular
  2) Avoids running the app in a file:// origin
*/

import fs from 'fs';
import path from 'path';
import electron from 'electron';

const DIST_PATH = path.resolve(__dirname, '../renderer');
const scheme = "app";

const mimeTypes: { [key: string]: string } = {
  ".js": "text/javascript",
  ".mjs": "text/javascript",
  ".html": "text/html",
  ".htm": "text/html",
  ".json": "application/json",
  ".css": "text/css",
  ".svg": "image/svg+xml",
  ".ico": "image/vnd.microsoft.icon",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".map": "text/plain"
};

function charset(mimeExt: string) {
  return [".html", ".htm", ".js", ".mjs"].some((m) => m === mimeExt) ?
    "utf-8" :
    null;
}

function mime(filename: string) {
  const mimeExt = path.extname(`${filename || ""}`).toLowerCase();
  const mimeType = mimeTypes[mimeExt];
  return mimeType ? { mimeExt, mimeType } : { mimeExt: null, mimeType: null };
}

function requestHandler(req: Electron.ProtocolRequest, next: (response: (Buffer) | (Electron.ProtocolResponse)) => void) {
  const reqUrl = new URL(req.url);
  let reqPath = path.normalize(reqUrl.pathname);

  if (reqPath === "/index.html") {
    reqPath = "/main_window/index.html";
  }

  /*if (reqPath.includes('/main_window')) {
    electron.clipboard.writeText(JSON.stringify({ reqPath, newReqPath: reqPath.replace('/main_window', '') }));
    reqPath = reqPath.replace('/main_window', '')
  }*/

  const reqFilename = path.basename(reqPath);

  if (reqPath.includes('app/.webpack/renderer') && reqPath.includes(reqFilename)) {
    electron.clipboard.writeText(JSON.stringify({ reqPath, reqUrl, reqFilename, DIST_PATH, cwd: process.cwd(), dirname: __dirname, nextReqPath: path.join(DIST_PATH, `/main_window/${reqFilename}`) }));
    reqPath = `/main_window/${reqFilename}`
  }

  fs.readFile(path.join(DIST_PATH, reqPath), (err, data) => {
    const { mimeExt, mimeType } = mime(reqFilename);
    if (!err && mimeType !== null) {
      next({
        mimeType,
        charset: charset(mimeExt),
        data
      });
    } else {
      electron.clipboard.writeText(JSON.stringify({ err, reqPath, reqUrl, reqFilename, DIST_PATH, cwd: process.cwd(), dirname: __dirname }));
      throw err;
    }
  });
}

export default {
  scheme,
  requestHandler,
};