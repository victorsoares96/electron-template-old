import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import i18n from "@localization/i18n.config";
import { I18nextProvider } from "react-i18next";
import Root from "@renderer/core/root";
import { store, history } from "@renderer/redux/store/store";
import "bulma/css/bulma.css";

const root = ReactDOM.createRoot(
  document.getElementById('target') as HTMLElement
);

root.render(
  <I18nextProvider i18n={i18n}>
    <Suspense fallback="loading">
      <Root store={store} history={history}></Root>
    </Suspense>
  </I18nextProvider>
);