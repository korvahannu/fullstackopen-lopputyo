import React from 'react';
import { login } from '../../reducers/userReducer';
import { setNotification } from '../../reducers/notificationReducer';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './LoginForm';
import useField from '../../hooks/useField';

const LoginPrompt = () => {
    const dispatch = useDispatch();
    const username = useField('text', 'username');
    const password = useField('password', 'password');
    const error = useSelector(state => state.notification);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await dispatch(login(username.value, password.value));
        }
        catch(error) {
            await dispatch(setNotification('login-error', 'Invalid login credentials', 5));
        }
    };

    return (
        <LoginForm username={username} password={password} handleSubmit={handleSubmit} error={error} />
    );
};

export default LoginPrompt;