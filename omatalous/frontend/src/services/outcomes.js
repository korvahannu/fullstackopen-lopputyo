import axios from 'axios';
import { baseUrl } from '../utils/config';
import { getToken } from '../utils/tokenholder';

export const addOutcome = async (outcome) => {
    const config = {
        headers: {
            Authorization: getToken()
            
        }
    };

    const response = await axios.post(`${baseUrl}/api/outcomes`, outcome, config);
    return response.data;
};