import React, { useState } from 'react';
import useField from '../../hooks/useField';
import PropTypes from 'prop-types';
import EmailPrompt from './EmailPrompt';
import ChangePasswordPrompt from './ChangePasswordPrompt';
import Success from './Success';
import Fail from './Fail';
import userForgotPassword, { resetUserPassword } from '../../services/forgotPassword';

const RegisterPrompt = ({ view }) => {

    const email = useField('email', 'email');
    const [phase, setPhase] = useState('send-email');
    const password = useField('password', 'password');
    const passwordCheck = useField('password', 'passwordCheck');
    const verificationToken = useField('text', 'verificationToken');
    const [passwordErrorText, setPasswordErrorText] = useState('');

    const sendVerificationCode = (event) => {
        event.preventDefault();
        userForgotPassword({ email: email.value });
        setPhase('change-password');
    };

    const changePassword = async (event) => {
        event.preventDefault();
        if (password.value !== passwordCheck.value) {
            setPasswordErrorText('Set passwords do not match!');
            return;
        }
        if (password.value.length < 5) {
            setPasswordErrorText('Your password must be at least 5 characters long!');
            return;
        }

        try {
            resetUserPassword({
                email: email.value,
                password: password.value,
                token: verificationToken.value
            });
            setPhase('success');
        }
        catch(error) {
            setPhase('error');
        }
    };

    const redirectToLoginScreen = () => {
        view.navigate('login', 'prevent-save');
    };

    return (
        <>
            {
                phase === 'send-email'
                    ? <EmailPrompt redirectToLoginScreen={redirectToLoginScreen} onSubmit={sendVerificationCode} email={email} />
                    : phase === 'change-password'
                        ? <ChangePasswordPrompt verificationToken={verificationToken} redirectToLoginScreen={redirectToLoginScreen} onSubmit={changePassword} passwordErrorText={passwordErrorText} password={password} passwordCheck={passwordCheck} />
                        : phase === 'success'
                        ? <Success redirectToLoginScreen={redirectToLoginScreen} />
                        : <Fail redirectToLoginScreen={redirectToLoginScreen} />
            }
        </>
    );
};


RegisterPrompt.propTypes = {
    view: PropTypes.object
};

export default RegisterPrompt;