import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@shivangi_2408/effective-ui';

import './index.css';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
);