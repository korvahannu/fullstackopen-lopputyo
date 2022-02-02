import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container, Box, Paper, Button, Typography } from '@mui/material';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { useParams } from 'react-router-dom';
import { verifyUser } from '../../services/register';

const Confirm = ({ view }) => {

    const { confirmationCode } = useParams();

    useEffect(() => {
        try {
            verifyUser(confirmationCode);
        }
        catch (error) {
            view.navigate('login', 'prevent-save');
        }
    }, []);

    const redirectToLoginScreen = () => {
        view.navigate('login', 'prevent-save');
    };

    return (
        <Container maxWidth='xs'>
            <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography align='center' variant='h5' sx={{ mb: 2 }}><EmojiEmotionsIcon /> Success!</Typography>

                <Paper elevation={3} sx={{ border: 0, padding: 2 }}>
                    <Typography paragraph align='center'>Your account has been registered and you are now ready to start saving some money!</Typography>
                    <Button fullWidth onClick={redirectToLoginScreen} variant='contained'>Go to login screen</Button>
                </Paper>
            </Box>

        </Container>
    );
};


Confirm.propTypes = {
    view: PropTypes.object
};

export default Confirm;