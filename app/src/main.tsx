/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createRoot } from 'react-dom/client';
import i18n from '@localization/i18n.config';
import { I18nextProvider } from 'react-i18next';
import { Suspense } from 'react';
import './index.css';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <I18nextProvider i18n={i18n}>
    <Suspense fallback="loading">
      <App />
    </Suspense>
  </I18nextProvider>,
);
