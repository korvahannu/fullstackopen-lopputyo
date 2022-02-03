import React from 'react';
import { Container, Box, Paper, Button, Typography } from '@mui/material';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import PropTypes from 'prop-types';

const Success = ({onSubmit, redirectToLoginScreen}) => {

    return (
        <Container maxWidth='xs'>
            <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography align='center' variant='h5' sx={{ mb: 2 }}><VpnKeyIcon /> Reset password</Typography>

                <Paper component='div' onSubmit={onSubmit} elevation={3} sx={{ border: 0, padding: 2 }}>

                    <Typography variant='subtitle2'>Oh no! Something went wrong. Your password has not been reset. Please check that you input the right verification code. </Typography>

                    <Button onClick={redirectToLoginScreen} type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                        Return to loginscreen
                    </Button>
                </Paper>
            </Box>

        </Container>
    );
};

Success.propTypes = {
    onSubmit: PropTypes.func,
    redirectToLoginScreen: PropTypes.func,
    email: PropTypes.object
};

export default Success;