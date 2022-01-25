import React, {useState} from 'react';
import {  Box, Button } from '@mui/material';
import {useSelector } from 'react-redux';
import Loading from '../../Loading';
import AccountInfoHolder from './AccountInfoHolder';
import NewAccountDialog from './Dialogs/NewAccount';
import EditAccountDialog from './Dialogs/EditAccountDialog.js';

const Accounts = () => {
    
    const [showNewAccountDialog, setShowNewAccountDialog] = useState(false);
    const [showEditAccountDialog, setShowEditAccountDialog] = useState(false);
    const [targetAccount, setTargetAccount] = useState(null);
    const user = useSelector(state => state.user);

    if(!user)
        return null;

    const accounts = useSelector(state => state.accounts);

    const openEditAccountWindow = (account) => {
        setTargetAccount(account);
        setShowEditAccountDialog(true);
    };

    if(!accounts)
        return <Loading />;

    return (
        <Box sx={{ flexGrow: 0.15, pl:'5%', pr: '5%'}}>
            <NewAccountDialog open={showNewAccountDialog} setOpen={setShowNewAccountDialog} />
            <EditAccountDialog  account={targetAccount} open={showEditAccountDialog} setOpen={setShowEditAccountDialog} />

            <Button variant='contained' sx={{ ml:3, mr: 4 }} onClick={()=>setShowNewAccountDialog(!showNewAccountDialog)}>New account</Button> <br />

            {accounts.map(
                    account =><AccountInfoHolder openEditAccountWindow={openEditAccountWindow} key={account.id.toString()} account={account}/>)}
        </Box>
    );
};


export default Accounts;