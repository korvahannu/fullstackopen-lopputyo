import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import Store from './store.js';
import CssBaseline from '@mui/material/CssBaseline';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { logout } from './reducers/userReducer';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

// Makeshift middleware, if any request at any time results in status code that starts with 4
// => Log out user and remove from localstorage
axios.interceptors.response.use((response) => {

  if (response.status.toString().substring(0, 1) === '4') {
    const dispatch = useDispatch();
    dispatch(logout());
  }

  return response;
});


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