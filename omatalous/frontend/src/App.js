import React, { useEffect, useState } from 'react';
import LoginPrompt from './components/LoginPrompt';

import { loadAccounts } from './reducers/accountsReducer';
import { loadCategories } from './reducers/categoriesReducer';
import { loadPaymentMethods } from './reducers/paymentMethodsReducer';
import { loadTransactions } from './reducers/transactionsReducer';
import { tryToLoadUserFromStorage } from './reducers/userReducer';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider, Box } from '@mui/material';
import useTheme from './hooks/useTheme';

import TopBar from './components/TopBar';
import SideBar from './components/SideBar';
import Accounts from './components/Views/Accounts';
import Home from './components/Views/Home';

import Transactions from './components/Views/Transactions';
import If from './utils/If';

import {
  Routes,
  Route,
  useNavigate
} from 'react-router-dom';

const App = () => {

  const themeSelector = useTheme();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const [view, setView] = useState('home');
  const navigate = useNavigate();

  useEffect(() => {
    const previousView = window.localStorage.getItem('view');
    if(previousView && previousView !=='' && previousView!== null&&previousView!==undefined) {
      setView(previousView);
    }
  }, []);

  useEffect(async () => {
    window.localStorage.setItem('view', view);
  }, [ view]);

  useEffect(async () => {

    if(user) {
      console.log('Dispatching all reducer-loads');
      // Put all user reducer loads here
      dispatch(loadTransactions());
      dispatch(loadCategories());
      dispatch(loadAccounts());
      dispatch(loadPaymentMethods());

      navigate(`/${view}`);
    }
    else {
      if(!user) {
        dispatch(tryToLoadUserFromStorage());
        navigate('/login');
      }
    }

  }, [user]);

  useEffect(() => {
    
  },[view]);

  return (
    <ThemeProvider theme={themeSelector.theme}>
      <TopBar user={user} />

      <Box sx={{ display: 'flex', paddingTop: 3 }}>

        <If condition={user}>
          <Box sx={{ flexGrow: 0.1 }}>
            <SideBar view={view} setView={setView} />
          </Box>
        </If>

        <Routes>
          <Route path='/login' element={<LoginPrompt />} />
            <Route path='/transactions' element={<Transactions />} />
            <Route path='/home' element={<Home />} />
            <Route path='/accounts' element={<Accounts />} />
        </Routes>
      </Box>
    </ThemeProvider>
  );
};


export default App;
