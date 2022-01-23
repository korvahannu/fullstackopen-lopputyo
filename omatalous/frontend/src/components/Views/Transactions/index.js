import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TransactionsDataGrid from './TransactionsDataGrid';
import { Button, Box } from '@mui/material';
import NewTransactionDialog from './NewTransactionDialog';
import { deleteManyTransactions } from '../../../reducers/transactionsReducer';
import Loading from '../../Loading';


const Transactions = () => {
    const dispatch = useDispatch();
    const [newDialog, setNewDialog] = useState(false);
    const [selected, setSelected] = useState([]);
    const transactions = useSelector(state => state.transactions);

    if(!transactions||transactions.length === 0)
        return <Loading />;

    const onSelectionModelChange = (selections) => {
        setSelected(selections);
    };

    const deleteSelected = () => {
        if(window.confirm('Are you sure you want to delete selected?')) {
            dispatch(deleteManyTransactions(selected));
            setSelected([]);
        }
    };
    
    return(
        <>
            <NewTransactionDialog open={newDialog} setOpen={setNewDialog} />
            <Box sx={{mb:3}}>
                <Button variant='contained' sx={{mr:4}} onClick={()=>setNewDialog(true)}>Add new</Button>
                <Button variant='outlined' onClick={deleteSelected}>Delete selected</Button>
            </Box>
            <TransactionsDataGrid transactions={transactions} onSelectionChange={onSelectionModelChange} />
        </>
    );
};

export default Transactions;