import { Divider, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const Footer = () => (
    <>
        <footer style={{ backgroundColor:'white', display:'block', position:'fixed', bottom:0, height:'120px', width:'100%', padding:'16px' }}>
            <Divider sx={{mb:2}}/>
            <Box sx={{display:'flex'}}>
                <Typography color='lightgrey' variant='subtitle2'>
                    <i>MY ECONOMY <br />Created by Hannu Korvala</i>
                </Typography>
                <Box sx={{flexGrow:1}} />
                <Typography color='lightgrey' variant='subtitle2'>
                    <i>© Hannu Korvala <br/>
                    Version 1, 5. February 2022</i>
                </Typography>
            </Box>

        </footer>
    </>
);

export default Footer;