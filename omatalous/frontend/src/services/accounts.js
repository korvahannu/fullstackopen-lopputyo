import axios from 'axios';
import { baseUrl } from '../utils/config';
import { getConfig } from '../utils/tokenholder';


export const getUserAccounts = async () => {
    const response = await axios.get(`${baseUrl}/api/accounts`, getConfig());
    return response.data;
};

export const addNewUserAccount = async (account) => {
    const response = await axios.post(`${baseUrl}/api/accounts`, account, getConfig());
    return response.data;
};

export const removeUserAccount = async (account) => {
    await axios.delete(`${baseUrl}/api/accounts/${account.id}`,getConfig());
};

export const editUserAccount = async (update) => {
    const response = await axios.put(`${baseUrl}/api/accounts/${update.id}`, update, getConfig());
    return response.data;
};