/* eslint-disable prettier/prettier */
import 'react-image-lightbox/style.css';
import 'react-lazy-load-image-component/src/effects/black-and-white.css';
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import 'react-quill/dist/quill.snow.css';
import 'simplebar/src/simplebar.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import './utils/highlight';

import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import AdapterDateFns from '@mui/lab/AdapterDateFns';

import { PersistGate } from 'redux-persist/lib/integration/react';

import { LocalizationProvider } from '@mui/lab';
import App from './App';
import { CollapseDrawerProvider } from './contexts/CollapseDrawerContext';
import { AuthProvider } from './contexts/JWTContext';
import { persistor, store } from './store';

ReactDOM.render(
  <AuthProvider>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <CollapseDrawerProvider>
              <HashRouter>
                <App />
              </HashRouter>
            </CollapseDrawerProvider>

        </PersistGate>
      </ReduxProvider>
  </AuthProvider>,
  document.getElementById('root'),
);
