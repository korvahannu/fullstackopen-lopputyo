import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

// Import reducers here
import userReducer from './reducers/userReducer';
import transactionsReducer from './reducers/transactionsReducer';

const reducer = combineReducers({
    user: userReducer,
    transactions: transactionsReducer
});

const Store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default Store;