import React from 'react';
import { Box, Button, Divider, Typography } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const TransactionsOverview = () => {

    return (
        <Box sx={{ mr:2, border: '1px solid lightgrey', borderRadius: 1, width: '350px', padding: 2, '&:hover': { cursor: 'pointer', backgroundColor: '#f7f7f7' } }}>

            <Box sx={{ display: 'flex' }}>
                <Typography variant='body1'>
                    Recent transactions
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
                <ArrowForwardIosIcon sx={{ width: '12px' }} />
            </Box>
            <Divider sx={{ mb: 1, mt: 1 }} />
            <Box sx={{ display: 'flex' }}>
                <Typography variant='body2'><KeyboardArrowDownIcon sx={{ position: 'relative', top: '5px', mr: 0.5, color:'red' }} /> Groceries</Typography>
                <Box sx={{ flexGrow: 1 }} />
                <Typography variant='body2' sx={{ position: 'relative', top: '10px', mr: 0.5, color: 'red' }} >-80.05 €</Typography>
            </Box>
            <Box sx={{ display: 'flex' }}>
                <Typography variant='body2'><KeyboardArrowDownIcon sx={{ position: 'relative', top: '5px', mr: 0.5, color:'red' }} /> Gas</Typography>
                <Box sx={{ flexGrow: 1 }} />
                <Typography variant='body2' sx={{ position: 'relative', top: '10px', mr: 0.5, color: 'red' }} >-50.00 €</Typography>
            </Box>
            <Box sx={{ display: 'flex' }}>
                <Typography variant='body2'><KeyboardArrowUpIcon sx={{ position: 'relative', top: '5px', mr: 0.5, color:'green' }} /> Mike paid loan</Typography>
                <Box sx={{ flexGrow: 1 }} />
                <Typography variant='body2' sx={{ position: 'relative', top: '10px', mr: 0.5, color: 'green' }} >+28.50 €</Typography>
            </Box>
            <Divider sx={{ mt: 2, mb: 2 }} />
            <Box sx={{display:'flex', justifyContent:'center', mb:1}}>
                <Button color='success' size='small' variant='contained' startIcon={<KeyboardArrowUpIcon />}>new income</Button>
                <Box sx={{width:'16px'}}/>
                <Button color='error' size='small' variant='contained' startIcon={<KeyboardArrowDownIcon />}>new outcome</Button>
            </Box>
            <Typography align='center' variant='subtitle2'>Click to manage transactions</Typography>
        </Box>
    );
};

export default TransactionsOverview;