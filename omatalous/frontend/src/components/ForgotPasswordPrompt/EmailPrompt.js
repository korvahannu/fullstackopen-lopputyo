import React from 'react';
import { Container, Box, Paper, TextField, Typography, Grid, Link } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import PropTypes from 'prop-types';

const EmailPrompt = ({loading, email, onSubmit, redirectToLoginScreen}) => {

    return (
        <Container maxWidth='xs'>
            <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography align='center' variant='h5' sx={{ mb: 2 }}><VpnKeyIcon /> Reset password</Typography>

                <Paper component='form' onSubmit={onSubmit} elevation={3} sx={{ border: 0, padding: 2 }}>
                    <Typography variant='subtitle2'>You can send a link to your email that you can use to reset your password.</Typography>
                    <TextField disabled={loading} margin='normal' label='Email' fullWidth autoFocus {...email.getInputParameters} />

                    <LoadingButton loading={loading} type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                        Send
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

EmailPrompt.propTypes = {
    loading: PropTypes.bool,
    onSubmit: PropTypes.func,
    redirectToLoginScreen: PropTypes.func,
    email: PropTypes.object
};

export default EmailPrompt;