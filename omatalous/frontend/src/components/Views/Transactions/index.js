import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TransactionsDataGrid from './TransactionsDataGrid';
import { Button, Box, Select, MenuItem } from '@mui/material';
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
    const [filter, setFilter] = useState('all');
    const [accountFilter, setAccountFilter] = useState('all');
    const accounts = useSelector(state => state.accounts);
    const transactions = useSelector(state => {
        const filtered = !filter || filter === 'all'
        ?  state.transactions.transactions
        : filter === 'incomes'
        ?  state.transactions.transactions.filter(r => r.type === 'income')
        :  state.transactions.transactions.filter(r => r.type === 'outcome');

        const filteredAgain = !accountFilter||accountFilter==='all'
        ? filtered
        : filtered.filter(r => r.account._id === accountFilter);

        return {
            loading: state.transactions.loading,
            transactions: filteredAgain
        };
    });

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

    if (!transactions.transactions || transactions.loading)
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


            <Box sx={{ mb: '16px', display:'flex', flexWrap:'wrap' }}>

                <Button startIcon={<ArrowUpwardIcon />} variant='contained' color='success' sx={{ mr: 4, minWidth:'175px', mb:2 }} onClick={openNewIncomeDialog}>New Income</Button>
                <Button startIcon={<ArrowDownwardIcon />} variant='contained' color='error' sx={{ mr: 4,  minWidth:'175px', mb:2 }} onClick={openNewOutcomeDialog}>New Outcome</Button>


                {
                    selected.length < 1
                        ? null
                        : selected.length === 1
                            ? <Button variant='outlined' sx={{mr:4,  minWidth:'175px', mb:2}} onClick={() => setShowEditTransactionDialog(true)} startIcon={<EditIcon />}> Edit selected</Button>
                            : <Button variant='outlined' sx={{mr:4,  minWidth:'175px', mb:2}} color='error' onClick={deleteSelected} startIcon={<DeleteForeverIcon />}> Delete selected</Button>
                }

                <Box sx={{flexGrow:1}}/>

                <Select size='small' sx={{ minWidth: '175px', mr: 4, mb:2 }} variant='standard' defaultValue={'all'}
                value={accountFilter} onChange={(event)=>setAccountFilter(event.target.value)}>
                    <MenuItem value={'all'}>All accounts</MenuItem>
                    {
                        !accounts.loading && accounts.accounts.map(account => {
                            return <MenuItem key={account.id} value={account.id}>{account.name}</MenuItem>;
                        })
                    }
                </Select>

                <Select size='small' sx={{ minWidth: '175px', mb:2 }} variant='standard' defaultValue={'all'}
                value={filter} onChange={(event)=>setFilter(event.target.value)}>
                    <MenuItem value={'all'}>Incomes and outcomes</MenuItem>
                    <MenuItem value={'incomes'}>Incomes only</MenuItem>
                    <MenuItem value={'outcomes'}>Outcomes only</MenuItem>
                </Select>

            </Box>
            <TransactionsDataGrid transactions={transactions.transactions} onSelectionChange={onSelectionModelChange} />


            <Alert open={deleteWindow} setOpen={setDeleteWindow} titleText='Warning, please read!'
                bodyText='Deleting these transactions is permanent and it can not be undone!'
                onAccept={acceptDeleteSelected} />
        </Box>
    );
};

export default Transactions;