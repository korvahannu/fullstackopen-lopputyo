import React, { useEffect } from 'react';
import IncomeOutcomeSheet from './components/IncomeOutcomeSheet';
import LoginPrompt from './components/LoginPrompt';

import { load as tryToLoadUserFromStorage } from './reducers/userReducer';
import { useDispatch, useSelector } from 'react-redux';
import { load as loadTransactions } from './reducers/transactionsReducer';
import { ThemeProvider } from '@mui/material';
import useTheme from './hooks/useTheme';

import If from './utils/If';
import TopBar from './components/TopBar';

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
      <If condition={user}
      onConditionTrue={<IncomeOutcomeSheet />}
      onConditionFalse={<LoginPrompt />} />
    </ThemeProvider>
  );
};

export default App;
