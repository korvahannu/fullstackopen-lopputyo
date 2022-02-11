import axios from 'axios';
import { baseUrl } from '../utils/config';

const register = async (credentials) => {
    const response = await axios.post(`${baseUrl}/api/register`, credentials);
    return response.data;
};

export const verifyUser = async (code) => {
    const response = await axios.post(`${baseUrl}/api/register/confirm/${code}`);
    return response.data;
};

export default register;