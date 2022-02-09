import axios from 'axios';
import { baseUrl } from '../utils/config';
import { getConfig } from '../utils/tokenholder';

export const addOutcome = async (outcome) => {
    const response = await axios.post(`${baseUrl}/api/outcomes`, outcome, getConfig());
    const data = response.data;
    data._id = data.id;
    return data;
};