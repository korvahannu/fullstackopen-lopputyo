import React, { useEffect } from 'react';
import LoginPrompt from './components/LoginPrompt';

import { useSelector } from 'react-redux';
import { ThemeProvider, Box } from '@mui/material';

import useTheme from './hooks/useTheme';
import TopBar from './components/TopBar';
import SideBar from './components/SideBar';
import Accounts from './components/Views/Accounts';
import Home from './components/Views/Home';
import Profile from './components/Views/Profile';

import Transactions from './components/Views/Transactions';
import If from './utils/If';
import initializeReduxStorage from './utils/initializeReduxStorage';

import {
  Routes,
  Route
} from 'react-router-dom';
import useView from './hooks/useView';

/*
@App.js has only a few functions
  1. uses useView() to handle navigation in cooperation of react-routers
  2. Dispatches all reducer loads for a valid user using helper initializeReduxStorage.js
  3. uses selector to check wether user is valid or not

All unnecessary components should be eliminated, keep this and index.js clean
*/

const App = () => {

  const themeSelector = useTheme();
  const user = useSelector(state => state.user);
  const view = useView();
  const initializer = initializeReduxStorage();

  useEffect(async () => {
    if(user) {
      initializer.init();
      view.navigate(view.value);
    }
    else {
      initializer.loadUserFromStorage();
      view.navigate('login', 'prevent-save');
    }
  }, [user]);

  return (
    <ThemeProvider theme={themeSelector.theme}>
      <TopBar user={user} view={view} />

      <Box sx={{ display: 'flex'}}>
        <If condition={user}>
          <SideBar view={view} />
        </If>

        <Routes>
          <Route path='/login' element={<LoginPrompt view={view} />} />
            <Route path='/transactions' element={<Transactions />} />
            <Route path='/home' element={<Home />} />
            <Route path='/accounts' element={<Accounts />} />
            <Route path='/profile' element={<Profile />} />
        </Routes>
      </Box>
    </ThemeProvider>
  );
};


export default App;
