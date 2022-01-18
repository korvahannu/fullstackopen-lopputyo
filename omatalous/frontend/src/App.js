import React, { useEffect } from 'react';
import IncomeOutcomeSheet from './components/IncomeOutcomeSheet';
import LoginPrompt from './components/LoginPrompt';

import { load } from './reducers/userReducer';
import { useDispatch, useSelector } from 'react-redux';

const App = () => {

  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  useEffect(() => {
    dispatch(load());
  }, []);

  return (
    <div className="App">
      Header

      {
        user
          ? <IncomeOutcomeSheet />
          : <LoginPrompt />
      }
    </div>
  );
};

export default App;
