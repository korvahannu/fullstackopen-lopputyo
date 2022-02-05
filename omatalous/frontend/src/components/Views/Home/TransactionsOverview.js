import React from 'react';
import { Box, Button, CircularProgress, Divider, Typography } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const TransactionsOverview = ({switchToTransactionsView, setShowNewIncomeDialog, setShowNewOutcomeDialog}) => {

    const transactions = useSelector(state => {

        return {
            loading: state.transactions.loading,
            transactions: state.transactions.transactions
        };
    });

    return (
        <Box sx={{ mr: 2, border: '1px solid lightgrey', borderRadius: 1, width: '350px', padding: 2 }}>

            <Box sx={{ display: 'flex', '&:hover': { cursor: 'pointer' } }} onClick={switchToTransactionsView}>
                <Typography variant='body1'>
                    Recent transactions
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
                <ArrowForwardIosIcon sx={{ width: '12px' }} />
            </Box>
            <Divider sx={{ mb: 1, mt: 1 }} />
            {
                transactions.transactions && !transactions.loading
                ? <ListedTransactions transactions={transactions.transactions.slice(0,3)} />
                : <ProgressBar />
            }
            <Divider sx={{ mt: 2, mb: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
                <Button onClick={()=>setShowNewIncomeDialog(true)} color='success' size='small' variant='contained' startIcon={<KeyboardArrowUpIcon />}>new income</Button>
                <Box sx={{ width: '16px' }} />
                <Button onClick={()=>setShowNewOutcomeDialog(true)} color='error' size='small' variant='contained' startIcon={<KeyboardArrowDownIcon />}>new outcome</Button>
            </Box>
        </Box>
    );
};

TransactionsOverview.propTypes = {
    switchToTransactionsView: PropTypes.func,
    setShowNewOutcomeDialog: PropTypes.func,
    setShowNewIncomeDialog: PropTypes.func
};

const ProgressBar = () => (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
    </Box>
);

const ListedTransactions = ({ transactions }) => {

    const list = transactions.map(transaction => (
        <Box sx={{ display: 'flex' }} key={transaction.id}>
            <Typography variant='body2'>
                {
                    transaction.category.type === 'income'
                    ? <KeyboardArrowUpIcon sx={{ position: 'relative', top: '5px', mr: 0.5, color: 'green' }} />
                    : <KeyboardArrowDownIcon sx={{ position: 'relative', top: '5px', mr: 0.5, color: 'red' }} />
                }
                
            
            {transaction.category.name}</Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Typography variant='body2' sx={{ position: 'relative', top: '10px', mr: 0.5, color: transaction.category.type === 'income' ? 'green' : 'red' }} >
                {transaction.category.type === 'income' ? '+' : '-'}{transaction.amount} €</Typography>
        </Box>
    ));

    return list;
};

export default TransactionsOverview;