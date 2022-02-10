import React, { useState } from 'react';
import useStyle from '../../styles';
import { Box, Typography } from '@mui/material';
import AccountsOverview from './AccountsOverview';
import TransactionsOverview from './TransactionsOverview';
import MonthOverview from './MonthOverview';
import NewOutcomeDialog from '../Transactions/Dialogs/NewOutcome';
import NewIncomeDialog from '../Transactions//Dialogs/NewIncome';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Loading from '../../Loading';

const Home = ({ view }) => {
    const [showNewOutcomeDialog, setShowNewOutcomeDialog] = useState(false);
    const [showNewIncomeDialog, setShowNewIncomeDialog] = useState(false);
    const classes = useStyle();

    const switchToAccountsView = () => view.navigate('accounts');
    const switchToTransactionsView = () => view.navigate('transactions');
    const switchToAssesmentView = () => view.navigate('assesment');

    const date = new Date();
    const firstDayOfCurrentMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const firstDayOfLastMonth = new Date(date.getFullYear(), date.getMonth() - 1, 1);

    const transactions = useSelector(state => {

        return {
            loading: state.transactions.loading,
            transactions: state.transactions.transactions
        };
    });

    if (transactions.loading || !transactions || !transactions.transactions)
        return (
            <Box className={classes.viewContainer}>
                <Loading />
            </Box>
        );

    const thisMonth = transactions.transactions.filter(tr => new Date(tr.date) >= firstDayOfCurrentMonth);
    const lastMonth = transactions.transactions.filter(tr => new Date(tr.date) >= firstDayOfLastMonth && new Date(tr.date) < firstDayOfCurrentMonth);
    let thisMonthEarnings = 0,
        thisMonthSpendings = 0,
        lastMonthEarnings = 0,
        lastMonthSpendings = 0;

    thisMonth.forEach(transaction => {
        if (!transaction.category)
            return null;
        transaction.category.type === 'income'
            ? thisMonthEarnings += transaction.amount
            : thisMonthSpendings += transaction.amount;
    });

    lastMonth.forEach(transaction => {
        if (!transaction.category)
            return null;
        transaction.category.type === 'income'
            ? lastMonthEarnings += transaction.amount
            : lastMonthSpendings += transaction.amount;
    });

    return (
        <Box className={classes.viewContainer}>

            <NewOutcomeDialog open={showNewOutcomeDialog} setOpen={setShowNewOutcomeDialog} />
            <NewIncomeDialog open={showNewIncomeDialog} setOpen={setShowNewIncomeDialog} />

            <Typography variant='h5' sx={{ mb: 3 }}>Daily financial matters</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', mb: 2 }}>

                <TransactionsOverview setShowNewOutcomeDialog={setShowNewOutcomeDialog} setShowNewIncomeDialog={setShowNewIncomeDialog} switchToTransactionsView={switchToTransactionsView} />
                <AccountsOverview switchToAccountsView={switchToAccountsView} />


            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'row' }}>

                <MonthOverview switchToAssesmentView={switchToAssesmentView} earnings={thisMonthEarnings} spendings={thisMonthSpendings} title='This month...' />
                <MonthOverview switchToAssesmentView={switchToAssesmentView} earnings={lastMonthEarnings} spendings={lastMonthSpendings} title='Last month...' />

            </Box>

        </Box>
    );
};

Home.propTypes = {
    view: PropTypes.object
};

export default Home;