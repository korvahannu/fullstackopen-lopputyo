import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TransactionsDataGrid from './TransactionsDataGrid';
import { Button, Box } from '@mui/material';
import NewOutcomeDialog from './Dialogs/NewOutcome';
import NewIncomeDialog from './Dialogs/NewIncome';
import EditTransaction from './EditTransaction';
import { deleteManyTransactions } from '../../../reducers/transactionsReducer';
import Loading from '../../Loading';
import useStyle from '../../styles';
import Alert from '../../Alert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const Transactions = () => {
    const classes = useStyle();
    const dispatch = useDispatch();
    const [showNewOutcomeDialog, setShowNewOutcomeDialog] = useState(false);
    const [showNewIncomeDialog, setShowNewIncomeDialog] = useState(false);
    const [showEditTransactionDialog, setShowEditTransactionDialog] = useState(false);
    const [selected, setSelected] = useState([]);
    const transactions = useSelector(state => state.transactions);
    const [deleteWindow, setDeleteWindow] = useState(false);

    const openNewIncomeDialog = () => setShowNewIncomeDialog(true);

    const openNewOutcomeDialog = () => setShowNewOutcomeDialog(true);

    const onSelectionModelChange = (selections) => setSelected(selections);

    const deleteSelected = () => {
        setDeleteWindow(true);
    };

    const acceptDeleteSelected = () => {
        dispatch(deleteManyTransactions(selected));
        setSelected([]);
    };

    if(!transactions.transactions||transactions.loading)
        return (
            <Box className={classes.viewContainer}>
                <Loading />
            </Box>
        );

    return (
        <Box className={classes.viewContainer}>
            
            <NewOutcomeDialog open={showNewOutcomeDialog} setOpen={setShowNewOutcomeDialog} />
            <NewIncomeDialog open={showNewIncomeDialog} setOpen={setShowNewIncomeDialog} />
            <EditTransaction setSelected={setSelected} target={selected[0]} open={showEditTransactionDialog} setOpen={setShowEditTransactionDialog} />

        
            <Box sx={{ mb: '16px' }}>

                <Button startIcon={<ArrowUpwardIcon />} variant='contained' color='success' sx={{ mr: 4 }} onClick={openNewIncomeDialog}>New Income</Button>
                <Button startIcon={<ArrowDownwardIcon />} variant='contained' color='error' sx={{ mr: 4 }} onClick={openNewOutcomeDialog}>New Outcome</Button>
                
                
                {
                    selected.length < 1
                    ? null
                    : selected.length === 1
                    ? <Button variant='outlined' onClick={() => setShowEditTransactionDialog(true)} startIcon={<EditIcon />}> Edit selected</Button>
                    : <Button variant='outlined' color='error' onClick={deleteSelected} startIcon={<DeleteForeverIcon />}> Delete selected</Button>
                }
                
            </Box>
            <TransactionsDataGrid transactions={transactions.transactions} onSelectionChange={onSelectionModelChange} />


            <Alert open={deleteWindow} setOpen={setDeleteWindow} titleText='Warning, please read!'
            bodyText='Deleting these transactions is permanent and it can not be undone!'
            onAccept={acceptDeleteSelected} />
        </Box>
    );
};

export default Transactions;