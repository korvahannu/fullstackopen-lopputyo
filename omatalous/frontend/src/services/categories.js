import axios from 'axios';
import { baseUrl } from '../utils/config';
import { getToken } from '../utils/tokenholder';


export const getUserCategories = async () => {
    const config = {
        headers: {
            Authorization: getToken()
        }
    };

    const response = await axios.get(`${baseUrl}/api/categories`, config);
    return response.data;
};

export const addNewCategory = async (body) => {
    const config = {
        headers: {
            Authorization: getToken()
        }
    };

    const response = await axios.post(`${baseUrl}/api/categories`, body, config);
    return response.data;
};

export const deleteUserCategory = async (categoryId) => {

    await axios.delete(`${baseUrl}/api/categories/${categoryId}`,
    {
        headers: {
            Authorization: getToken()
        }
    });

};

export const editUserCategory = async (categoryId, body) => {
    const config = {
        headers: {
            Authorization: getToken()
            
        }
    };

    const response = await axios.put(`${baseUrl}/api/categories/${categoryId}`, body, config);
    return response.data;
};