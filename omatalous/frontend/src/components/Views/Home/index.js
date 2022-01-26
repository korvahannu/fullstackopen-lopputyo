import React from 'react';
import useStyle from '../../styles';
import { Box, Typography } from '@mui/material';

const Home = () => {

    const classes = useStyle();

    return (
        <Box className={classes.viewContainer}>
            <Typography variant='h4'>Welcome home!</Typography>
        </Box>
    );
};

export default Home;