import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider } from 'react-redux';
import Store from './store.js';

import CssBaseline from '@mui/material/CssBaseline';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={Store}>
      <CssBaseline />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);