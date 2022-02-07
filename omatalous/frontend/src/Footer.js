import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const Footer = () => (
    <>
        <footer style={{boxShadow:'0px 0px 50px -5px rgba(0,0,0,0.59)', borderTop:'1px solid #ccc', backgroundColor:'white', display:'block', position:'fixed', bottom:0, height:'80px', width:'100%', padding:'16px' }}>
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