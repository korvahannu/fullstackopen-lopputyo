import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import useStyles from './components/styles';

const Footer = () => {
    const classes = useStyles();
    return (<>
        <footer className={classes.footer}>
            <Box sx={{ display: 'flex' }}>
                <Typography className={classes.footerText} variant='subtitle2'>
                    <i>MY ECONOMY <br />Created by Hannu Korvala</i>
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
                <Typography className={classes.footerText} variant='subtitle2'>
                    <i>© Hannu Korvala <br />
                        Version 1, 5. February 2022</i>
                </Typography>
            </Box>

        </footer>
    </>);
};

export default Footer;