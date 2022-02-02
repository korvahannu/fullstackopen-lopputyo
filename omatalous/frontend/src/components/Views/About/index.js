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
            <Typography>GNU GENERAL PUBLIC LICENSE <br />
                       Version 3, 29 June 2007 <br />

 Copyright (C) 2007 Free Software Foundation, Inc. <br /> <br />
 Everyone is permitted to copy and distribute verbatim copies
 of this license document, but changing it is not allowed.</Typography>

        </Box>
    );
};

export default About;