import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import Store from './store.js';
import CssBaseline from '@mui/material/CssBaseline';

// LocalizationProvider and AdapterDateFns are used for a datepicker.
// It may have more future uses? I have to deep dive into localization at some point
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

ReactDOM.render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Provider store={Store}>
        <CssBaseline />
        <App />
      </Provider>
    </LocalizationProvider>
  </React.StrictMode>,
  document.getElementById('root')
);