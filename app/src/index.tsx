import { Suspense } from 'react';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { HistoryRouter } from 'redux-first-history/rr6';
import i18n from '@localization/i18n.config';
import { createRoot } from 'react-dom/client';
import './index.css';
import Nav from '@src/core/Nav';
import AppRoutes from '@src/core/Routes';
import { store, history } from './store';
import 'bulma/css/bulma.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <I18nextProvider i18n={i18n}>
    <Suspense fallback="loading">
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Nav history={history} />
          <AppRoutes />
        </HistoryRouter>
      </Provider>
    </Suspense>
  </I18nextProvider>,
);
