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
import About from './components/Views/About';
import Learn from './components/Views/Learn';
import Register from './components/RegisterForm';
import ForgotPasswordPrompt from './components/ForgotPasswordPrompt';
import Confirm from './components/Confirm';
import EmailSent from './components/EmailSent';
import Categories from './components/Views/Categories';
import Assesments from './components/Views/Assesments';
import FrontPage from './components/Views/FrontPage';

import Transactions from './components/Views/Transactions';
import If from './utils/If';
import initializeReduxStorage from './utils/initializeReduxStorage';
import Footer from './Footer';

import {
  Routes,
  Route,
  useLocation
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
  const location = useLocation();

  useEffect(async () => {
    if (location.pathname.startsWith('/confirm')
      || location.pathname.startsWith('/email-sent-to-verify'))
      return null;

    if (user) {
      initializer.init();
      view.navigate(view.value);
    }
    else {
      initializer.loadUserFromStorage();
      view.navigate('', 'prevent-save');
    }
  }, [user]);

  const setColor = (c) => {
    themeSelector.changeTheme(c);
  };

  return (
    <ThemeProvider theme={themeSelector.theme}>
      <TopBar setColor={setColor} color={themeSelector.color} user={user} view={view} />
      <div style={{overflow:'auto', paddingBottom:'80px'}}>
      <main>
        <Box sx={{ display: 'flex' }}>
          <If condition={user}>
            <SideBar view={view} />
          </If>

          <Routes>
            <Route path='/login' element={<LoginPrompt view={view} />} />
            <Route path='/transactions' element={<Transactions />} />
            <Route path='/home' element={<Home view={view} />} />
            <Route path='/accounts' element={<Accounts />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/about' element={<About />} />
            <Route path='/learn' element={<Learn />} />
            <Route path='/register' element={<Register view={view} />} />
            <Route path='/forgot' element={<ForgotPasswordPrompt view={view} />} />
            <Route path='/confirm/:confirmationCode' element={<Confirm view={view} />} />
            <Route path='/email-sent-to-verify' element={<EmailSent view={view} />} />
            <Route path='/categories' element={<Categories />} />
            <Route path='/assesment' element={<Assesments />} />
            <Route path='/' element={<FrontPage view={view} />} />
          </Routes>
        </Box>
      </main>
      <Footer />
      </div>
    </ThemeProvider>


  );
};


export default App;
