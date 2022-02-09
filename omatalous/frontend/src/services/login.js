import axios from 'axios';
import { baseUrl } from '../utils/config';
import { getConfig } from '../utils/tokenholder';

const login = async (credentials) => {
    const response = await axios.post(`${baseUrl}/api/login`, credentials);
    return response.data;
};

export const testLogin = async () => {
    const response = await axios.get(`${baseUrl}/api/user`, getConfig());
    return response.data;
};

export default login;