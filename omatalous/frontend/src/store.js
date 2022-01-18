import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

// Import reducers here
import userReducer from './reducers/userReducer';

const reducer = combineReducers({
    user: userReducer
});

const Store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default Store;