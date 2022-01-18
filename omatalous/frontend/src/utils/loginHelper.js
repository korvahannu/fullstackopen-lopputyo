import { LOCALSTORAGE_USER } from './config';
import login from '../services/login';

const loginHelper = {
    getUserFromStorage: () => {

        const user = window.localStorage.getItem(LOCALSTORAGE_USER);
    
        if(user) {
            return JSON.parse(user);
        }
    
        return null;
    },
    loginUsingCredentials: async (username, password) => {
        const credentials = {
            username,
            password
        };

        const user = await login(credentials);
        window.localStorage.setItem(LOCALSTORAGE_USER, JSON.stringify(user));

        return user;
    },
    removeUserFromLocalStorage: () => {
        window.localStorage.removeItem(LOCALSTORAGE_USER);
    }
};



export default loginHelper;