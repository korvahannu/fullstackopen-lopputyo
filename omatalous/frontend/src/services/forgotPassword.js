import axios from 'axios';
import { baseUrl } from '../utils/config';

const userForgotPassword = async (body) => {
    const response = await axios.post(`${baseUrl}/api/forgot`, body);
    return response.data;
};

export const resetUserPassword = async (body) => {
    const response = await axios.post(`${baseUrl}/api/forgot/changepassword`, body);
    return response.data;
};

export default userForgotPassword;