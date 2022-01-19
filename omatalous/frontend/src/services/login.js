import axios from 'axios';
import { baseUrl } from '../utils/config';

const login = async (credentials) => {
    const response = await axios.post(`${baseUrl}/api/login`, credentials);
    return response.data;
};

export default login;