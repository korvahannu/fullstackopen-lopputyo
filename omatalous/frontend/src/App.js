import React, { useEffect } from 'react';
import IncomeOutcomeSheet from './components/IncomeOutcomeSheet';
import LoginPrompt from './components/LoginPrompt';

import { load as tryToLoadUserFromStorage } from './reducers/userReducer';
import { useDispatch, useSelector } from 'react-redux';
import { load as loadTransactions } from './reducers/transactionsReducer';

const App = () => {

  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  useEffect(() => {
    dispatch(tryToLoadUserFromStorage());
  }, []);

  if(!user)
    return <LoginPrompt />;
  
  dispatch(loadTransactions());

  return <IncomeOutcomeSheet />;
};

export default App;
