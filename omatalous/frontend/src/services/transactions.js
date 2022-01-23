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