import React from 'react';
import useStyle from '../../styles';
import { Box, Typography } from '@mui/material';

const Home = () => {

    const classes = useStyle();

    return (
        <Box className={classes.viewContainer}>
            <Typography variant='h5'>Welcome home!</Typography>
            <Typography>Tähän ainakin lista accounteista ja niiden balanceista + uusimmat transaktiot.
                Mahdollisesti myös jo tämän kuun tulot - menot = kuukauden tasapaino
            </Typography>
        </Box>
    );
};

export default Home;