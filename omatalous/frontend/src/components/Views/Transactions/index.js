import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import TransactionsDataGrid from './TransactionsDataGrid';
import { Button, Box } from '@mui/material';
import NewTransactionDialog from './NewTransactionDialog';


const IncomeOutcomeSheet = () => {

    const [newDialog, setNewDialog] = useState(false);
    const transactionList = useSelector(state => state.transactions);    

    return(
        <>
            <NewTransactionDialog open={newDialog} setOpen={setNewDialog} />
            <Box sx={{mb:3}}>
                <Button variant='contained' sx={{mr:4}} onClick={()=>setNewDialog(true)}>Add new</Button>
                <Button variant='outlined'>Delete selected</Button>
            </Box>
            <TransactionsDataGrid transactions={transactionList} />
        </>
    );
};

export default IncomeOutcomeSheet;