import axios from 'axios';
import { baseUrl } from '../utils/config';
import { getConfig } from '../utils/tokenholder';

const DeleteUser = async () => {

    const response = await axios.post(`${baseUrl}/api/user/deleteAccount/`, null, getConfig());
    
    return response.data;
};

export default DeleteUser;