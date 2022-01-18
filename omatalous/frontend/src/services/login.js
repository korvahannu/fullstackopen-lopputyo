import axios from 'axios';
import baseUrl from './services.config';

const login = async (credentials) => {
    console.log(credentials);
    const response = await axios.post(`${baseUrl}/api/login`, credentials);
    return response.data;
};

export default login;