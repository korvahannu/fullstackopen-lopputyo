import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

// Import reducers here
import userReducer from './reducers/userReducer';
import transactionsReducer from './reducers/transactionsReducer';
import notificationReducer from './reducers/notificationReducer';
import categoriesReducer from './reducers/categoriesReducer';
import accountsReducer from './reducers/accountsReducer';
import paymentMethodsReducer from './reducers/paymentMethodsReducer';

const reducer = combineReducers({
    user: userReducer,                      // Contains user info and actions for login and logout
    transactions: transactionsReducer,      // Contains all user transactions
    notification: notificationReducer,       // Used for notifications and misc. uses
    categories: categoriesReducer,
    accounts: accountsReducer,
    paymentMethods:paymentMethodsReducer
});

const Store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default Store;