import axios from 'axios';
import { baseUrl } from '../utils/config';
import { getToken } from '../utils/tokenholder';

const logout = async () => {

    const response = await axios.post(`${baseUrl}/api/logout`, null, {
        headers: {
            'authorization': getToken()
        }
    });
    
    return response.data;
};

export default logout;