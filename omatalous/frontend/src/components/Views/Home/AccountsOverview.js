import React from 'react';
import { Box, Divider, Typography } from '@mui/material';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const AccountsOverview = () => {

    return (
        <Box sx={{ mr:2, border: '1px solid lightgrey', borderRadius: 1, width: '350px', padding: 2, '&:hover': { cursor: 'pointer', backgroundColor: '#f7f7f7' } }}>

            <Box sx={{ display: 'flex' }}>
                <Typography variant='body1'>
                    Accounts
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
                <ArrowForwardIosIcon sx={{ width: '12px' }} />
            </Box>
            <Divider sx={{ mb: 1, mt: 1 }} />
            <Box sx={{ display: 'flex' }}>
                <Typography variant='body2'><AssignmentIndIcon sx={{ position: 'relative', top: '5px', mr: 0.5 }} /> Default account</Typography>
                <Box sx={{ flexGrow: 1 }} />
                <Typography variant='body2' sx={{ position: 'relative', top: '10px', mr: 0.5, color: 'green' }} >500 €</Typography>
            </Box>
            <Box sx={{ display: 'flex' }}>
                <Typography variant='body2'><AssignmentIndIcon sx={{ position: 'relative', top: '5px', mr: 0.5 }} /> Savings account</Typography>
                <Box sx={{ flexGrow: 1 }} />
                <Typography variant='body2' sx={{ position: 'relative', top: '10px', mr: 0.5, color: 'green' }} >3500 €</Typography>
            </Box>
            <Box sx={{ display: 'flex' }}>
                <Typography variant='body2'><AssignmentIndIcon sx={{ position: 'relative', top: '5px', mr: 0.5 }} /> Work account</Typography>
                <Box sx={{ flexGrow: 1 }} />
                <Typography variant='body2' sx={{ position: 'relative', top: '10px', mr: 0.5, color: 'red' }} >-25.08 €</Typography>
            </Box>
            <Divider sx={{ mt: 2, mb: 2 }} />
            <Typography align='center' variant='subtitle2'>Click to manage accounts</Typography>
        </Box>
    );
};

export default AccountsOverview;