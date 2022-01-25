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
    const user = useSelector(state => state.user);

    useEffect(() => {
        if(user)
            dispatch(loadTransactions());
    }, []);

    const openNewIncomeDialog = () => setShowNewIncomeDialog(true);

    const openNewOutcomeDialog = () => setShowNewOutcomeDialog(true);

    const onSelectionModelChange = (selections) => setSelected(selections);

    const deleteSelected = () => {
        if (window.confirm('Are you sure you want to delete selected?')) {
            dispatch(deleteManyTransactions(selected));
            setSelected([]);
        }
    };

    return (
        <Box sx={{ flexGrow: 1, pr: '5%' }}>

            <NewOutcomeDialog open={showNewOutcomeDialog} setOpen={setShowNewOutcomeDialog} />
            <NewIncomeDialog open={showNewIncomeDialog} setOpen={setShowNewIncomeDialog} />

            <If condition={!transactions.isLoading}>
                <Box sx={{ mb: 3 }}>
                    <Button variant='contained' color='error' sx={{ mr: 4 }} onClick={openNewOutcomeDialog}>Add Outcome</Button>
                    <Button variant='contained' color='success' sx={{ mr: 4 }} onClick={openNewIncomeDialog}>Add Income</Button>
                    
                    {
                        selected.length < 1
                        ? null
                        : selected.length === 1
                        ? <Button variant='outlined'>Edit selected</Button>
                        : <Button variant='outlined' onClick={deleteSelected}>Delete selected</Button>
                    }
                    
                </Box>
                <TransactionsDataGrid transactions={transactions} onSelectionChange={onSelectionModelChange} />
            </If>

            <If condition={transactions.isLoading}>
                <Loading />
            </If>

        </Box>
    );
};

export default Transactions;