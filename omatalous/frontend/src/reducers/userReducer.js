import loginService from '../services/login';
import { LOCALSTORAGE_USER } from '../utils/config';

const reducer = (state = null, action) => {
    switch(action.type) {
        case 'LOGOUT':
            return null;
        case 'LOGIN':
            return action.user;
        default:
            return state;
    }
};

export const logout = () => {
    return async dispatch => {
        window.localStorage.removeItem(LOCALSTORAGE_USER);
        dispatch({type:'LOGOUT'});
    };
};

export const load = () => {


    return dispatch => {
        const user = window.localStorage.getItem(LOCALSTORAGE_USER);
        if(user) {
            dispatch({type:'LOGIN', user});
        }
        else
            return null; // Does this work?
    };
};

export const login = (username, password) => {

    return async dispatch => {

        const credentials = {
            username,
            password
        };

        const user = await loginService(credentials);
        
        window.localStorage.setItem(LOCALSTORAGE_USER, JSON.stringify(user));
        dispatch({type:'LOGIN', user});
    };
};

export default reducer;