import React from 'react';
import { login } from '../../reducers/userReducer';
import { useDispatch } from 'react-redux';

const LoginPrompt = () => {

    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        const username = event.target.username.value;
        const password = event.target.username.value;
        dispatch(login(username, password));
    };

    return (
        <div>
            <h1>Login prompt</h1>
            <form onSubmit={handleSubmit}>
                <p>Username: <input type="text" name="username" /></p>
                <p>Password: <input type="password" name="password" /></p>
                <p><button type="submit">Login</button></p>
            </form>
        </div>
    );
};

export default LoginPrompt;