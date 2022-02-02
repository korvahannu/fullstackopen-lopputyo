import React, { useState } from 'react';
import useField from '../../hooks/useField';
import PropTypes from 'prop-types';
import { Container, Box, Paper, Button, TextField, Typography, Grid, Link } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import register from '../../services/register';

const RegisterPrompt = ({ view }) => {
    const name = useField('text', 'name');
    const username = useField('text', 'username');
    const password = useField('password', 'password');
    const passwordCheck = useField('password', 'passwordCheck');
    const email = useField('email', 'email');

    const [usernameError, setUsernameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [passwordCheckError, setPasswordCheckError] = useState(false);
    const [error, setError] = useState(false);
    const [registerError, setRegisterError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(false);

        //eslint-disable-next-line
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        let error = false;
        if (!simpleValidate(username.value) || username.value.length < 5) {
            error = true;
            setUsernameError(true);
        }
        if (username.value.length < 5) {
            error = true;
            setUsernameError(true);
        }
        if (!simpleValidate(email.value) || !re.test(email.value)) {
            error = true;
            setEmailError(true);
        }
        if (!simpleValidate(password.value)) {
            error = true;
            setPasswordError(true);
        }
        else {
            if (password.value.length < 5) {
                error = true;
                setPasswordError(true);
            }
            else if (password.value !== passwordCheck.value) {
                error = true;
                setPasswordCheckError(true);
            }
        }

        if (error) {
            setError(true);
            return null;
        }

        try {
            await register({
                name: name.value,
                username: username.value,
                email: email.value,
                password: password.value
            });

            view.navigate('email-sent-to-verify', 'prevent-save');
        }
        catch(error) {
            setRegisterError('Error while registering your user account! The username or email may have already been taken.');
        }

    };

    const redirectToLoginScreen = () => {
        view.navigate('login', 'prevent-save');
    };

    return (
        <Container maxWidth='xs'>
            <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography align='center' variant='h5' sx={{ mb: 2 }}><PersonIcon /> Register as new user</Typography>

                <Paper component='form' onSubmit={handleSubmit} elevation={3} sx={{ border: 0, padding: 2 }}>

                    <Typography align='center' variant='subtitle1' color='error'>{registerError}</Typography>

                    <TextField margin='normal' label='Name' fullWidth autoFocus {...name.getInputParameters} />
                    <TextField error={usernameError} onFocus={() => setUsernameError(false)} margin='normal' label='Username' fullWidth autoFocus {...username.getInputParameters} />
                    <TextField error={emailError} onFocus={() => setEmailError(false)} margin='normal' label='Email' fullWidth autoFocus {...email.getInputParameters} />
                    <TextField error={passwordError} onFocus={() => setPasswordError(false)} margin='normal' label='Password' autoComplete='current-password' fullWidth {...password.getInputParameters} />
                    <TextField error={passwordCheckError} onFocus={() => setPasswordCheckError(false)} margin='normal' label='Password again' fullWidth autoFocus {...passwordCheck.getInputParameters} />

                    <Typography variant='caption'>{'After clicking "Register" -button, you will be sent an email confirmation link.'}</Typography>

                    {
                        error === true
                        ? <Typography key={error} variant='subtitle2' align='center' sx={{ color: 'red' }}>Please check highlighted fields.</Typography>
                        : null
                    }

                    <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                        Register
                    </Button>
                </Paper>
            </Box>

            <Grid container>
                <Grid item xs>
                    <Link href='#' onClick={redirectToLoginScreen} variant='body2'>
                        Back to login screen
                    </Link>
                </Grid>
            </Grid>

        </Container>
    );
};

const simpleValidate = (input) => {
    if (input !== ''
        && input !== null
        && input !== undefined
        && input !== ' ')
        return true;
    return false;
};

RegisterPrompt.propTypes = {
    view: PropTypes.object
};

export default RegisterPrompt;