import React from 'react';
import useStyle from '../../styles';
import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import Loading from '../../Loading';

const About = () => {

    const classes = useStyle();
    const categories = useSelector(state => state.categories);

    if (!categories.categories || categories.loading)
    return (
        <Box className={classes.viewContainer}>
            <Loading />
        </Box>
    );

    return (
        <Box className={classes.viewContainer}>
            
            <Typography variant='h5'>Your categories</Typography>

            {
                categories.categories.map(c => <p key={c.id}>{c.name}</p>)
            }

        </Box>
    );
};

export default About;