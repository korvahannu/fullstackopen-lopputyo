import loginService from '../services/login';
import { LOCALSTORAGE_USER } from '../utils/config';
import { setToken } from '../utils/tokenholder';
import { testLogin } from '../services/login';
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
        window.localStorage.removeItem(LOCALSTORAGE_USER);
        window.localStorage.removeItem('view');
        await logoutService();
        dispatch({type:'LOGOUT'});
    };
};

export const load = () => {


    return async dispatch => {
        const user = JSON.parse(window.localStorage.getItem(LOCALSTORAGE_USER));
        if(user) {
            console.log('found user in storage');
            setToken(user.token);
            dispatch({type:'LOGIN', user});
            try {
                await testLogin();
            }
            catch (error) {
                console.log('invalid loaded login' + error);
                window.localStorage.removeItem(LOCALSTORAGE_USER);
                window.localStorage.removeItem('view');
                setToken('');
                dispatch({type:'LOGOUT'});
            }
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

        console.log('logging in ....');
        const user = await loginService(credentials);
        
        if(user) {
            window.localStorage.setItem(LOCALSTORAGE_USER, JSON.stringify(user));
            setToken(user.token);
            dispatch({type:'LOGIN', user});
        }
        else
            window.localStorage.removeItem(LOCALSTORAGE_USER);
    };
};

export default reducer;