import axios from 'axios';
import { useDispatch } from 'react-redux';
import { logout } from '../reducers/userReducer';

const preventExpire = () => {
    const dispatch = useDispatch();

    axios.interceptors.response.use((response) => {
        console.log(response.status);

        if (response.status.toString().substring(0, 1) === '4') {
            dispatch(logout());
        }

        return response;
    });
};

export default preventExpire;