import React from 'react';
import useField from '../../hooks/useField';
import PropTypes from 'prop-types';
import { Container, Box, Paper, Button, TextField, Typography, Grid, Link } from '@mui/material';
import VpnKeyIcon from '@mui/icons-material/VpnKey';

const RegisterPrompt = ({ view }) => {

    const email = useField('email', 'email');

    const handleSubmit = () => {
        // TODO: Handle the stuff here
        /*
            1. Lähetä käyttäjän antama salasana backendille
            2. Backendi ottaa vastaan jossain routerissa sähköpostin
            3. Backendi generoi koodin ja lähettää sen sähköpostilla käyttäjälle
             - Samaan aikaan tämä näkymä vaihtuu semmoiseksi, joka ottaa vastaan koodin ja uuden salasanan
            4. Frontend lähettää backendille sähköpostin, generoidun koodin ja uuden salasanan
            5. Backend varmistaa kaiken ja vaihtaa salasanan, käyttäjälle ilmoitetaan asia.
        */
        return null;
    };

    const redirectToLoginScreen = () => {
        view.navigate('login', 'prevent-save');
    };

    return (
        <Container maxWidth='xs'>
            <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography align='center' variant='h5' sx={{ mb: 2 }}><VpnKeyIcon /> Reset password</Typography>

                <Paper component='form' onSubmit={handleSubmit} elevation={3} sx={{ border: 0, padding: 2 }}>
                    <Typography variant='subtitle2'>You can send a link to your email that you can use to reset your password.</Typography>
                    <TextField margin='normal' label='Email' fullWidth autoFocus {...email.getInputParameters} />

                    <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                        Send
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


RegisterPrompt.propTypes = {
    view: PropTypes.object
};

export default RegisterPrompt;