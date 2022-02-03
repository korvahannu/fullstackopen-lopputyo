import React from 'react';
import { Container, Box, Paper, TextField, Typography, Grid, Link } from '@mui/material';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import PropTypes from 'prop-types';
import LoadingButton from '@mui/lab/LoadingButton';

const ChangePasswordPrompt = ({loading, verificationToken, onSubmit, redirectToLoginScreen, password, passwordCheck, passwordErrorText}) => {

    return (
        <Container maxWidth='xs'>
            <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography align='center' variant='h5' sx={{ mb: 2 }}><VpnKeyIcon /> Reset password</Typography>

                <Paper component='form' onSubmit={onSubmit} elevation={3} sx={{ border: 0, padding: 2 }}>
                    <Typography variant='subtitle2'>Verification code has been sent to your email! Copy and paste the code here so we can verify your identity.</Typography>
                    
                    <TextField disabled={loading} margin='normal' size='small' variant='filled' label='Verification code' fullWidth autoFocus {...verificationToken.getInputParameters} />
                    <TextField disabled={loading} error={passwordErrorText !== ''} margin='normal' label='New password' fullWidth {...password.getInputParameters} />
                    <TextField disabled={loading} error={passwordErrorText !== ''} margin='normal' label='New password again' fullWidth {...passwordCheck.getInputParameters}  />

                    <Typography color='error'>{passwordErrorText}</Typography>

                    <LoadingButton loading={loading} type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                        Change password
                    </LoadingButton>
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

ChangePasswordPrompt.propTypes = {
    onSubmit: PropTypes.func,
    redirectToLoginScreen: PropTypes.func,
    email: PropTypes.object,
    password: PropTypes.object,
    passwordCheck: PropTypes.object,
    passwordErrorText: PropTypes.string,
    verificationToken: PropTypes.object,
    loading: PropTypes.bool
};

export default ChangePasswordPrompt;