import React from 'react';
import useStyle from '../../styles';
import { Box, Typography } from '@mui/material';
import AccountsOverview from './AccountsOverview';
import TransactionsOverview from './TransactionsOverview';
import MonthOverview from './MonthOverview';

const Home = () => {

    const classes = useStyle();

    return (
        <Box className={classes.viewContainer}>
            <Typography variant='h5' sx={{ mb: 3 }}>Daily financial matters</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', mb:2 }}>

                <TransactionsOverview />
                <AccountsOverview />
                

            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'row' }}>

                <MonthOverview earnings={2643.50} spendings={180.05} title='This month...' />
                <MonthOverview earnings={2430.83} spendings={2733.40} title='Last month...' />

            </Box>

        </Box>
    );
};

export default Home;