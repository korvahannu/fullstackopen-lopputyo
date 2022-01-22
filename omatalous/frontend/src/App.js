import React, { useEffect } from 'react';
import LoginPrompt from './components/LoginPrompt';

import { load as tryToLoadUserFromStorage } from './reducers/userReducer';
import { useDispatch, useSelector } from 'react-redux';
import { load as loadTransactions } from './reducers/transactionsReducer';
import { ThemeProvider, Box } from '@mui/material';
import useTheme from './hooks/useTheme';

import If from './utils/If';
import TopBar from './components/TopBar';
import SideBar from './components/SideBar';
import Main from './components/Main';

const App = () => {
  const themeSelector = useTheme(false);

  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  useEffect(() => {
    dispatch(tryToLoadUserFromStorage());
  }, []);

  if(user)
    dispatch(loadTransactions());

  return (
    <ThemeProvider theme={themeSelector.theme}>
      <TopBar user={user} />
      <If condition={user}>
        <Box sx={{display:'flex'}}>
          <Box sx={{flexGrow:0.5}}>
            <SideBar />
          </Box>
          <Box sx={{flexGrow:1}}>
              <Main />
          </Box>
        </Box>
      </If>
      <If condition={!user}>
        <LoginPrompt />
      </If>
    </ThemeProvider>
  );
};

export default App;
