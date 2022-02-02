import React from 'react';
import useStyle from '../../styles';
import { Box, Typography } from '@mui/material';

const Learn = () => {

    const classes = useStyle();

    return (
        <Box className={classes.viewContainer}>
            <Typography variant='h5'>Learn your way to economic freedom!</Typography>
        </Box>
    );
};

export default Learn;