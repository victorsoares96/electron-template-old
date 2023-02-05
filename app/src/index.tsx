import React from 'react';
import { createRoot } from 'react-dom/client';
// eslint-disable-next-line import/no-unresolved
import App from '@src/App';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);
