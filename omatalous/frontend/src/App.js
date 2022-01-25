import React, { useEffect, useState } from 'react';
import LoginPrompt from './components/LoginPrompt';

import { load as tryToLoadUserFromStorage } from './reducers/userReducer';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider, Box } from '@mui/material';
import useTheme from './hooks/useTheme';

import TopBar from './components/TopBar';
import SideBar from './components/SideBar';
import Accounts from './components/Views/Accounts';

import Transactions from './components/Views/Transactions';
import If from './utils/If';

import {
  Routes,
  Route,
  useNavigate
} from 'react-router-dom';

const App = () => {

  const themeSelector = useTheme(false);
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const [view, setView] = useState('home');
  const navigate = useNavigate();

  useEffect(() => {
    const previousView = window.localStorage.getItem('view');
    if(previousView && previousView !=='' && previousView!== null&&previousView!==undefined) {
      setView(previousView);
    }

    if(!user)
      dispatch(tryToLoadUserFromStorage());
  }, []);

  useEffect(async () => {
    if (user)
      navigate(`/${view}`);
    else if (!user)
      navigate('/login');
  }, [user]);

  useEffect(() => {
    window.localStorage.setItem('view', view);
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
            <Route path='/home' element={<img src='https://www.anychart.com/blog/wp-content/uploads/2017/09/data-visualization-best-practices-in-anychart-js-charts-dataviz-weekly.png' />} />
            <Route path='/accounts' element={<Accounts />} />
        </Routes>
      </Box>
    </ThemeProvider>
  );
};


export default App;
