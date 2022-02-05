import React from 'react';
import useStyle from '../../styles';
import { Box, Typography } from '@mui/material';

const About = () => {

    const classes = useStyle();

    return (
        <Box className={classes.viewContainer}>
            <Typography variant='h5'>About us</Typography>
            <Typography>Project web page: <a href='https://github.com/korvahannu/fullstackopen-lopputyo'>https://github.com/korvahannu/fullstackopen-lopputyo</a></Typography>
            <Typography paragraph>Created by Hannu Korvala</Typography>
            <Typography>© Hannu Korvala <br />
Version 1, 5. February 2022</Typography> <br />

<Typography paragraph>This project was originally created for Full Stack Open -course hosted by University of Helsinki.
This program is intented to be an easy and intuitive way of keeping track of an inviduals money.
By keeping track of all your incomes and outcomes you get more control over your own home economy.</Typography>

        </Box>
    );
};

export default About;