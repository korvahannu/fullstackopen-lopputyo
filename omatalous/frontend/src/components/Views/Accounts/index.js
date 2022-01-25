import React, {useState} from 'react';
import {  Box, Button } from '@mui/material';
import useAccounts from '../../../hooks/useAccounts';
import usePaymentMethods from '../../../hooks/usePaymentMethods';
import {useSelector } from 'react-redux';
import Loading from '../../Loading';
import AccountInfoHolder from './AccountInfoHolder';
import NewAccountDialog from './Dialogs/NewAccount';

const Accounts = () => {
    
    const [showNewAccountDialog, setShowNewAccountDialog] = useState(false);
    const user = useSelector(state => state.user);

    if(!user)
        return null;

    const accounts = useAccounts();
    const paymentMethods = usePaymentMethods();

    if(accounts.loading || paymentMethods.loading)
        return <Loading />;

    return (
        <Box sx={{ flexGrow: 0.15, pr: '5%' }}>
            <NewAccountDialog open={showNewAccountDialog} setOpen={setShowNewAccountDialog} />
            <Button variant='contained' sx={{ mr: 4, mb:4 }} onClick={()=>setShowNewAccountDialog(!showNewAccountDialog)}>New account</Button> <br />

            {accounts.accounts.map(
                    account =><AccountInfoHolder key={account.id.toString()} account={account} paymentMethods={paymentMethods.paymentMethods} />)}
        </Box>
    );
};


export default Accounts;