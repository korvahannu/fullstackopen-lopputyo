import React from 'react';
import PropTypes from 'prop-types';
import { Container, Box, Paper, Button, Typography } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';

const EmailSent = ({ view }) => {


    const redirectToLoginScreen = () => {
        view.navigate('login', 'prevent-save');
    };

    return (
        <Container maxWidth='xs'>
            <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography align='center' variant='h5' sx={{ mb: 2 }}><MailIcon /> Email sent!</Typography>

                <Paper elevation={3} sx={{ border: 0, padding: 2 }}>
                    <Typography paragraph align='center'>We have sent an email. Please verify your account by clicking the link provided in the email.</Typography>
                    <Button fullWidth onClick={redirectToLoginScreen} variant='contained'>Go to login screen</Button>
                </Paper>
            </Box>

        </Container>
    );
};


EmailSent.propTypes = {
    view: PropTypes.object
};

export default EmailSent;