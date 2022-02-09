import axios from 'axios';
import { baseUrl } from '../utils/config';
import { getConfig } from '../utils/tokenholder';

const logout = async () => {

    const response = await axios.post(`${baseUrl}/api/logout`, null, getConfig());
    
    return response.data;
};

export default logout;