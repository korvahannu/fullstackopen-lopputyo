import axios from 'axios';
import { baseUrl } from '../utils/config';
import { getToken } from '../utils/tokenholder';

export const getUserPaymentMethods = async () => {
    const config = {
        headers: {
            Authorization: getToken()
        }
    };

    const response = await axios.get(`${baseUrl}/api/paymentMethods`, config);
    return response.data;
};