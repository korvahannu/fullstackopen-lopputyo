import axios from 'axios';
import { baseUrl } from '../utils/config';
import { getToken, getConfig } from '../utils/tokenholder';


export const getUserTransactions = async () => {
    const response = await axios.get(`${baseUrl}/api/transactions`, getConfig());
    return response.data;
};

export const deleteMany = async (idArray) => {

    await axios.delete(`${baseUrl}/api/transactions`,
    {
        data: {
            idArray: idArray
        },
        headers: {
            Authorization: getToken()
        }
    });
};

export const updateUserTransaction = async (update) => {
    const response = await axios.put(`${baseUrl}/api/transactions/${update.id}`, update, getConfig());
    return response.data;
};