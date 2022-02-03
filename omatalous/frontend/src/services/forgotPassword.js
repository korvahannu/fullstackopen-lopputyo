import axios from 'axios';
import { baseUrl } from '../utils/config';

/*
    body = {
        email: email@email.com
    }
*/
const userForgotPassword = async (body) => {
    const response = await axios.post(`${baseUrl}/api/forgot`, body);
    return response.data;
};

/*
    body = {
        email: email@email.com,
        password: <some password>
        token: <token recieved via email>
    }
*/
export const resetUserPassword = async (body) => {
    const response = await axios.post(`${baseUrl}/api/forgot/changepassword`, body);
    return response.data;
};

export default userForgotPassword;