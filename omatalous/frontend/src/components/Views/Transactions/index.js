import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TransactionsDataGrid from './TransactionsDataGrid';
import { Button, Box } from '@mui/material';
import NewOutcomeDialog from './Dialogs/NewOutcome';
import NewIncomeDialog from './Dialogs/NewIncome';
import { deleteManyTransactions } from '../../../reducers/transactionsReducer';
import Loading from '../../Loading';
import If from '../../../utils/If';
import { loadTransactions } from '../../../reducers/transactionsReducer';


const Transactions = () => {
    const dispatch = useDispatch();
    const [showNewOutcomeDialog, setShowNewOutcomeDialog] = useState(false);
    const [showNewIncomeDialog, setShowNewIncomeDialog] = useState(false);
    const [selected, setSelected] = useState([]);
    const transactions = useSelector(state => state.transactions);

    useEffect(() => {
        dispatch(loadTransactions());
    }, []);

    const openNewIncomeDialog = () => {
        if (!transactions.isLoading)
            setShowNewIncomeDialog(true);
    };

    const openNewOutcomeDialog = () => {
        if (!transactions.isLoading)
            setShowNewOutcomeDialog(true);
    };

    const onSelectionModelChange = (selections) => {
        setSelected(selections);
    };

    const deleteSelected = () => {
        if (window.confirm('Are you sure you want to delete selected?')) {
            dispatch(deleteManyTransactions(selected));
            setSelected([]);
        }
    };

    return (
        <>

            <NewOutcomeDialog open={showNewOutcomeDialog} setOpen={setShowNewOutcomeDialog} />
            <NewIncomeDialog open={showNewIncomeDialog} setOpen={setShowNewIncomeDialog} />

            <Box sx={{ mb: 3 }}>
                <Button variant='contained' color='error' sx={{ mr: 4 }} onClick={openNewOutcomeDialog}>Add Outcome</Button>
                <Button variant='contained' color='success' sx={{ mr: 4 }} onClick={openNewIncomeDialog}>Add Income</Button>
                <Button variant='outlined' onClick={deleteSelected}>Delete selected</Button>
            </Box>

            <If condition={!transactions.isLoading}>
                <TransactionsDataGrid transactions={transactions} onSelectionChange={onSelectionModelChange} />
            </If>

            <If condition={transactions.isLoading}>
                <Loading />
            </If>

        </>
    );
};

export default Transactions;