import axios from 'axios';
import { baseUrl } from '../utils/config';
import { getConfig } from '../utils/tokenholder';


export const getUserPaymentMethods = async () => {
    const response = await axios.get(`${baseUrl}/api/paymentMethods`, getConfig());
    return response.data;
};