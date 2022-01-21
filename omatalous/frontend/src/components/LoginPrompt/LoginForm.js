import React from 'react';
import { Container, Box, Paper, Button, TextField, Typography, Grid, Link } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import PaidIcon from '@mui/icons-material/Paid';
import PropTypes from 'prop-types';

const LoginForm = ({username, password, handleSubmit, error}) => (
    <Container maxWidth='xs'>

        <Typography variant='h3' align='center' sx={{ mt: 3 }}><PaidIcon sx={{width:40, height:40}} />My Economy</Typography>

        <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography align='center' variant='h5' sx={{ mb: 2 }}><LockIcon /> Sign in</Typography>

            <Paper component='form' onSubmit={handleSubmit} elevation={3} sx={{ border: 0 }}>
                <TextField margin='normal' label='Username' fullWidth autoFocus {...username.getInputParameters} />
                <TextField margin='normal' label='Password' autoComplete='current-password' fullWidth {...password.getInputParameters} />
                <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                    Sign in
                </Button>
                {
                    error.enabled
                        ? <Typography variant='subtitle2' align='center' sx={{ color: 'red' }}>{error.message}</Typography>
                        : null
                }
            </Paper>
        </Box>

        <Grid container>
            <Grid item xs>
                <Link href='' variant='body2'>
                    Forgot password?
                </Link>
            </Grid>
            <Grid item>
                <Link href='' variant='body2'>
                    Register
                </Link>
            </Grid>
        </Grid>

    </Container>
);

LoginForm.propTypes = {
    username: PropTypes.object,
    password: PropTypes.object,
    handleSubmit: PropTypes.func,
    error: PropTypes.object
};

export default LoginForm;