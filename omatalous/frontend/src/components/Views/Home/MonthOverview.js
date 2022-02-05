import React from 'react';
import { Box, Divider, Typography } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PropTypes from 'prop-types';

const MonthOverview = ({title, earnings, spendings}) => {


    return (
        <Box sx={{ mr:2, border: '1px solid lightgrey', borderRadius: 1, width: '350px', padding: 2, '&:hover': { cursor: 'pointer', backgroundColor: '#f7f7f7' } }}>

            <Box sx={{ display: 'flex' }}>
                <Typography variant='body1'>
                    {title}
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
            </Box>
            <Divider sx={{ mb: 1, mt: 1 }} />
            <Box sx={{ display: 'flex' }}>
                <Typography variant='body2'><KeyboardArrowUpIcon sx={{ position: 'relative', top: '5px', mr: 0.5, color:'green' }} /> You have earned</Typography>
                <Box sx={{ flexGrow: 1 }} />
                <Typography variant='body2' sx={{ position: 'relative', top: '10px', mr: 0.5, color: 'green' }} >{earnings} €</Typography>
            </Box>
            <Box sx={{ display: 'flex' }}>
                <Typography variant='body2'><KeyboardArrowDownIcon sx={{ position: 'relative', top: '5px', mr: 0.5, color:'red' }} /> You have spent</Typography>
                <Box sx={{ flexGrow: 1 }} />
                <Typography variant='body2' sx={{ position: 'relative', top: '10px', mr: 0.5, color: 'red' }} >{spendings} €</Typography>
            </Box>
            <Divider sx={{mb:1, mt:1}}/>
            <Box sx={{ display: 'flex' }}>
                <Typography variant='body2'><AccountBalanceIcon sx={{ position: 'relative', top: '5px', mr: 0.5 }} /> with balance of</Typography>
                <Box sx={{ flexGrow: 1 }} />
                <Typography variant='body2' sx={{ position: 'relative', top: '10px', mr: 0.5, color: earnings >= spendings ? 'green' : 'red' }} >{Math.round((earnings-spendings) * 100) /100} €</Typography>
            </Box>
        </Box>
    );
};

MonthOverview.propTypes = {
    title: PropTypes.string,
    earnings: PropTypes.number,
    spendings: PropTypes.number
};

export default MonthOverview;