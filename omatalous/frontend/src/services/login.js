import axios from 'axios';
import { baseUrl } from '../utils/config';
import { getToken } from '../utils/tokenholder';

const login = async (credentials) => {
    const response = await axios.post(`${baseUrl}/api/login`, credentials);
    return response.data;
};

export const testLogin = async () => {
    const config = {
        headers: {
            Authorization: getToken()
        }
    };

    const response = await axios.get(`${baseUrl}/api/user`, config);
    return response.data;
};

export default login;