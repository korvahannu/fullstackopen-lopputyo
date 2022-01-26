import React from 'react';
import { login } from '../../reducers/userReducer';
import { setNotification } from '../../reducers/notificationReducer';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './LoginForm';
import useField from '../../hooks/useField';
import PropTypes from 'prop-types';

const LoginPrompt = ({view}) => {
    const dispatch = useDispatch();
    const username = useField('text', 'username');
    const password = useField('password', 'password');
    const error = useSelector(state => state.notification);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await dispatch(login(username.value, password.value));
            view.navigate('home');
        }
        catch(error) {
            await dispatch(setNotification('login-error', 'Invalid login credentials', 5));
        }
    };

    return (
        <LoginForm username={username} password={password} handleSubmit={handleSubmit} error={error} />
    );
};

LoginPrompt.propTypes = {
    view: PropTypes.object
};

export default LoginPrompt;