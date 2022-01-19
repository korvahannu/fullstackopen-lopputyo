import axios from 'axios';
import { baseUrl } from '../utils/config';
import { getToken } from '../utils/tokenholder';

export const getUserTransactions = async () => {
    const config = {
        headers: {
            Authorization: getToken()
        }
    };

    const response = await axios.get(`${baseUrl}/api/transactions`, config);
    return response.data;
};

export const addUserTransactions = async (transaction) => {
    const config = {
        headers: {
            Authorization: getToken()
        }
    };

    const response = await axios.post(`${baseUrl}/api/transactions`, transaction, config);
    return response.data;
};