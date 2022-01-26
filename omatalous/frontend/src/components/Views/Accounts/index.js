import React, {useState} from 'react';
import {  Box, Button } from '@mui/material';
import {useSelector } from 'react-redux';
import Loading from '../../Loading';
import AccountInfoHolder from './AccountInfoHolder';
import NewAccountDialog from './Dialogs/NewAccount';
import EditAccountDialog from './Dialogs/EditAccountDialog.js';
import useStyle from '../../styles';

const Accounts = () => {
    const classes = useStyle();
    const [showNewAccountDialog, setShowNewAccountDialog] = useState(false);
    const [showEditAccountDialog, setShowEditAccountDialog] = useState(false);
    const [targetAccount, setTargetAccount] = useState(null);
    const user = useSelector(state => state.user);

    const accounts = useSelector(state => state.accounts);

    const openEditAccountWindow = (account) => {
        setTargetAccount(account);
        setShowEditAccountDialog(true);
    };

    if(!accounts ||!user)
        return <Loading />;

    return (
        <Box className={classes.viewContainer}>
            <NewAccountDialog open={showNewAccountDialog} setOpen={setShowNewAccountDialog} />
            <EditAccountDialog  account={targetAccount} open={showEditAccountDialog} setOpen={setShowEditAccountDialog} />

            <Button variant='contained' onClick={()=>setShowNewAccountDialog(!showNewAccountDialog)}>New account</Button> <br />

            {accounts.map(
                    account =><AccountInfoHolder openEditAccountWindow={openEditAccountWindow} key={account.id.toString()} account={account}/>)}
        </Box>
    );
};


export default Accounts;