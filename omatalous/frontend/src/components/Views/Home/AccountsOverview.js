import React from 'react';
import { Box, Divider, Typography, CircularProgress } from '@mui/material';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const AccountsOverview = ({switchToAccountsView}) => {

    const accounts = useSelector(state => state.accounts);

    return (
        <Box onClick={switchToAccountsView} sx={{ mr: 2, border: '1px solid lightgrey', borderRadius: 1, width: '350px', padding: 2, '&:hover': { cursor: 'pointer', backgroundColor: '#f7f7f7' } }}>

            <Box sx={{ display: 'flex' }}>
                <Typography variant='body1'>
                    Accounts
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
                <ArrowForwardIosIcon sx={{ width: '12px' }} />
            </Box>

            <Divider sx={{ mb: 1, mt: 1 }} />

            {
                accounts.loading ||!accounts.accounts
                    ? <ProgressBar />
                    : <AccountsList accounts={accounts.accounts} />
            }
            <Divider sx={{ mt: 2, mb: 2 }} />
        </Box>
    );
};

AccountsOverview.propTypes ={
    switchToAccountsView: PropTypes.func
};

const ProgressBar = () => (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
    </Box>
);

const AccountsList = ({accounts}) => {
    const list = accounts.slice(0,3).map(account => {
        return (
            <Box sx={{ display: 'flex' }} key={account.id}>
                <Typography variant='body2'><AssignmentIndIcon sx={{ position: 'relative', top: '5px', mr: 0.5 }} /> {account.name}</Typography>
                <Box sx={{ flexGrow: 1 }} />
                <Typography variant='body2' sx={{ position: 'relative', top: '10px', mr: 0.5, color: account.balance >= 0 ? 'green' : 'red' }} >{account.balance} €</Typography>
            </Box>
        );
    });

    return list;
};

export default AccountsOverview;