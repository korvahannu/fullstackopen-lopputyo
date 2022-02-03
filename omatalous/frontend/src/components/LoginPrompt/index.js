import React, {useState } from 'react';
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
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            await dispatch(login(username.value, password.value));
            view.navigateToSaved();
        }
        catch(error) {
            setLoading(false);
            await dispatch(setNotification('login-error', 'Invalid login credentials', 5));
        }
    };

    const redirectToRegister = () => {
        if(!loading)
            view.navigate('register', 'prevent-save');
    };

    const redirectToPasswordReset = () => {
        if(!loading)
            view.navigate('forgot', 'prevent-save');
    };

    return (
        <LoginForm loading={loading} redirectToPasswordReset={redirectToPasswordReset} redirectToRegister={redirectToRegister} username={username} password={password} handleSubmit={handleSubmit} error={error} />
    );
};

LoginPrompt.propTypes = {
    view: PropTypes.object
};

export default LoginPrompt;