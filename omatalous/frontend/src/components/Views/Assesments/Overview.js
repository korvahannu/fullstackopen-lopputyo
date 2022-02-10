import { Box, Divider, Typography } from '@mui/material';
import React from 'react';
import ByCharts from './ByCharts';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { useSelector } from 'react-redux';
import Loading from '../../Loading';

const Overview = () => {

    const earnings = 50;
    const spendings = 200;

    const transactions = useSelector(state => {
        if (state.transactions.loading)
            return null;
        else
            return state.transactions.transactions;
    });

    if(!transactions)
        return <Loading />;

    return (
        <Box sx={{ paddingLeft: 2 }}>
            <Box sx={{ mt: 2, mr: 2, border: '1px solid lightgrey', borderRadius: 1, width: '700px', padding: 2, }}>

                <Box sx={{ display: 'flex' }}>
                    <Typography variant='h6'>
                        Monthly statistics
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                </Box>
                <Divider sx={{ mb: 1, mt: 1 }} />
                <Box sx={{ display: 'flex' }}>
                    <Typography variant='body2'><KeyboardArrowUpIcon sx={{ position: 'relative', top: '5px', mr: 0.5, color: 'green' }} /> You have earned</Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Typography variant='body2' sx={{ position: 'relative', top: '10px', mr: 0.5, color: 'green' }} >{earnings} €</Typography>
                </Box>
                <Box sx={{ display: 'flex' }}>
                    <Typography variant='body2'><KeyboardArrowDownIcon sx={{ position: 'relative', top: '5px', mr: 0.5, color: 'red' }} /> You have spent</Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Typography variant='body2' sx={{ position: 'relative', top: '10px', mr: 0.5, color: 'red' }} >{spendings} €</Typography>
                </Box>
                <Box sx={{ display: 'flex' }}>
                    <Typography variant='body2'><AccountBalanceIcon sx={{ position: 'relative', top: '5px', mr: 0.5 }} /> with balance of</Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Typography variant='body2' sx={{ position: 'relative', top: '10px', mr: 0.5, color: earnings >= spendings ? 'green' : 'red' }} >{Math.round((earnings - spendings) * 100) / 100} €</Typography>
                </Box>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ height: '16px' }} />
            <ByCharts transactions={transactions} />
        </Box>
    );
};

export default Overview;