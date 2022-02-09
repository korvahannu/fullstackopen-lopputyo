import axios from 'axios';
import { baseUrl } from '../utils/config';
import { getConfig } from '../utils/tokenholder';

export const addIncome = async (income) => {
    const response = await axios.post(`${baseUrl}/api/incomes`, income, getConfig());
    const data = response.data;
    data._id = data.id;
    return data;
};