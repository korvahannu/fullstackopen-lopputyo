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
    const [loading, setLoading] = useState(false);

    const sendVerificationCode = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            await userForgotPassword({ email: email.value });
            setLoading(false);
            setPhase('change-password');
        }
        catch(error) {
            setLoading(false);
        } 
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
            setLoading(true);
            await resetUserPassword({
                email: email.value,
                password: password.value,
                token: verificationToken.value
            });
            setLoading(false);
            setPhase('success');
        }
        catch(error) {
            setLoading(false);
            setPhase('error');
        }
    };

    const redirectToLoginScreen = () => {
        if(!loading)
            view.navigate('login', 'prevent-save');
    };

    return (
        <>
            {
                phase === 'send-email'
                    ? <EmailPrompt loading={loading} redirectToLoginScreen={redirectToLoginScreen} onSubmit={sendVerificationCode} email={email} />
                    : phase === 'change-password'
                        ? <ChangePasswordPrompt loading={loading} verificationToken={verificationToken} redirectToLoginScreen={redirectToLoginScreen} onSubmit={changePassword} passwordErrorText={passwordErrorText} password={password} passwordCheck={passwordCheck} />
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