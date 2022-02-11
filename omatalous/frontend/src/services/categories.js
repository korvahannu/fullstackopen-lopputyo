import axios from 'axios';
import { baseUrl } from '../utils/config';
import { getConfig } from '../utils/tokenholder';


export const getUserCategories = async () => {
    const response = await axios.get(`${baseUrl}/api/categories`, getConfig());
    return response.data;
};

export const addNewCategory = async (body) => {
    const response = await axios.post(`${baseUrl}/api/categories`, body, getConfig());
    return response.data;
};

export const deleteUserCategory = async (categoryId) => {
    await axios.delete(`${baseUrl}/api/categories/${categoryId}`,getConfig());
};

export const editUserCategory = async (categoryId, body) => {
    const response = await axios.put(`${baseUrl}/api/categories/${categoryId}`, body, getConfig());
    return response.data;
};