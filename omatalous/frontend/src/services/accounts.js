import axios from 'axios';
import { baseUrl } from '../utils/config';
import { getToken } from '../utils/tokenholder';


export const getUserAccounts = async () => {
    const config = {
        headers: {
            Authorization: getToken()
        }
    };

    const response = await axios.get(`${baseUrl}/api/accounts`, config);
    return response.data;
};

export const addNewUserAccount = async (account) => {
    const config = {
        headers: {
            Authorization: getToken()
            
        }
    };

    const response = await axios.post(`${baseUrl}/api/accounts`, account, config);
    return response.data;
};

export const removeUserAccount = async (account) => {

    await axios.delete(`${baseUrl}/api/accounts/${account.id}`,
    {
        headers: {
            Authorization: getToken()
        }
    });

};

/*
{
    id: target accounts id,
    name: new update name,
    paymentMethods: {
        add: [],
        delete: []
    }
}
*/
export const editUserAccount = async (update) => {
    const config = {
        headers: {
            Authorization: getToken()
            
        }
    };

    const response = await axios.put(`${baseUrl}/api/accounts/${update.id}`, update, config);
    return response.data;
};