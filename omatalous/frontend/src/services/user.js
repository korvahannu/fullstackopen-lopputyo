import axios from 'axios';
import { baseUrl } from '../utils/config';
import { getToken } from '../utils/tokenholder';

// Supports the change of name and password
export const editUser = async (updateInfo) => {
    const config = {
        headers: {
            Authorization: getToken()
            
        }
    };

    const response = await axios.put(`${baseUrl}/api/user/updateAccount/`, updateInfo, config);
    return response.data;
};

export const testPassword = async (password) => {
    const config = {
        headers: {
            Authorization: getToken()
            
        }
    };

    const response = await axios.post(`${baseUrl}/api/user/passwordTest/`, {password}, config);
    return response.data;
};