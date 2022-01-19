import loginService from '../services/login';
import { LOCALSTORAGE_USER } from '../utils/config';
import { setToken } from '../utils/tokenholder';
import logoutService from '../services/logout';

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
        await logoutService();
        window.localStorage.removeItem(LOCALSTORAGE_USER);
        dispatch({type:'LOGOUT'});
    };
};

export const load = () => {


    return async dispatch => {
        const user = JSON.parse(window.localStorage.getItem(LOCALSTORAGE_USER));
        if(user) {
            setToken(user.token);
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
        setToken(user.token);
        dispatch({type:'LOGIN', user});
    };
};

export default reducer;