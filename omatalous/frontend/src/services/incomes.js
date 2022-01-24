import axios from 'axios';
import { baseUrl } from '../utils/config';
import { getToken } from '../utils/tokenholder';

export const addIncome = async (income) => {
    const config = {
        headers: {
            Authorization: getToken()
            
        }
    };

    const response = await axios.post(`${baseUrl}/api/incomes`, income, config);
    return response.data;
};