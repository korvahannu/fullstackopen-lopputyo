import React, {useState} from 'react';
import {  Box, Button } from '@mui/material';
import useAccounts from '../../../hooks/useAccounts';
import usePaymentMethods from '../../../hooks/usePaymentMethods';
import {useSelector } from 'react-redux';
import Loading from '../../Loading';
import AccountInfoHolder from './AccountInfoHolder';
import NewAccountDialog from './Dialogs/NewAccount';
import EditAccountDialog from './Dialogs/EditAccountDialog.js';

const Accounts = () => {
    
    const [showNewAccountDialog, setShowNewAccountDialog] = useState(false);
    const [showEditAccountDialog, setShowEditAccountDialog] = useState(false);
    const [targetAccount, setTargetAccount] = useState(null);
    const [targetPaymentMethods, setTargetPaymentMethods] = useState([]);
    const user = useSelector(state => state.user);

    if(!user)
        return null;

    const accounts = useAccounts();
    const paymentMethods = usePaymentMethods();

    const updateAccounts = async () => {
        await accounts.getAccounts();
        await paymentMethods.getPaymentMethods();
    };

    const openEditAccountWindow = (account) => {
        setTargetAccount(account);
        setTargetPaymentMethods(
            paymentMethods.paymentMethods.filter(p => {
                if(p.account === null)
                    return false;

                return p.account.id === account.id;
            })
        );
        setShowEditAccountDialog(true);
    };

    if(accounts.loading || paymentMethods.loading)
        return <Loading />;

    return (
        <Box sx={{ flexGrow: 0.15, pl:'5%', pr: '5%'}}>
            <NewAccountDialog updateAccounts={updateAccounts} open={showNewAccountDialog} setOpen={setShowNewAccountDialog} />
            <EditAccountDialog paymentMethods={targetPaymentMethods} updateAccounts={updateAccounts} account={targetAccount} open={showEditAccountDialog} setOpen={setShowEditAccountDialog} />

            <Button variant='contained' sx={{ ml:3, mr: 4 }} onClick={()=>setShowNewAccountDialog(!showNewAccountDialog)}>New account</Button> <br />

            {accounts.accounts.map(
                    account =><AccountInfoHolder openEditAccountWindow={openEditAccountWindow} key={account.id.toString()} account={account} paymentMethods={paymentMethods.paymentMethods} />)}
        </Box>
    );
};


export default Accounts;