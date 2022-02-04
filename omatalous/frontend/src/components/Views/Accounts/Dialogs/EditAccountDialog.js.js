import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonBase, Dialog, DialogTitle, TextField, DialogContent, Box, DialogActions, Slide, FormControl, Typography, Divider } from '@mui/material';
import { forwardRef } from 'react';
import useStyles from '../../../styles';
import useField from '../../../../hooks/useField';
import { useSelector, useDispatch } from 'react-redux';
import { removeAccount, editAccount } from '../../../../reducers/accountsReducer';
import { loadPaymentMethods } from '../../../../reducers/paymentMethodsReducer';
import { loadTransactions } from '../../../../reducers/transactionsReducer';
import Alert from '../../../Alert';
import SendIcon from '@mui/icons-material/Send';
import CheckIcon from '@mui/icons-material/Check';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


const Transition = forwardRef(
    function Transition(props, ref) {
        return <Slide direction='up' ref={ref} {...props} />;
    }
);

const EditAccount = ({ account, open, setOpen }) => {

    const classes = useStyles();
    const [paymentMethodsToBeDeleted, setPaymentMethodsToBeDeleted] = useState([]);
    const [newPaymentMethods, setNewPaymentMethods] = useState([]);
    const newPaymentMethod = useField('text', 'paymentMethod');
    const [newAccountName, setNewAccountName] = useState('');
    const dispatch = useDispatch();
    const [deleteWindow, setDeleteWindow] = useState(false);
    const [editWindow, setEditWindow] = useState(false);
    const transactions = useSelector(state => {
        if(!state.transactions ||!state.transactions.transactions||!account)
            return null;
        return state.transactions.transactions.filter(tr => {
            if(!tr.account)
                return false;
            return tr.account.id === account.id;
        });
    });

    let transactionCount = 0;

    if(transactions)
        transactionCount = transactions.length;

    useEffect(() => {
        if(account) {
            setNewAccountName(account.name);
        }
    }, [account]);

    const paymentMethods = useSelector(state => {
        if(!state.paymentMethods.paymentMethods ||!account)
            return { loading: true, paymentMethods:null};

        return {
            loading: state.paymentMethods.loading,
            paymentMethods: state.paymentMethods.paymentMethods.filter(method => {
                if (!method.account)
                    return false;
                if (method.account.id !== account.id)
                    return false;

                return true;
            })
        };
    });

    const deleteAccount = async () => {
        setDeleteWindow(true);
    };

    const acceptDeleteAccount = async() => {
        await dispatch(removeAccount(account));
        setOpen(false);
    };

    const addToNewPaymentMethods = () => {
        setNewPaymentMethods([
            {
                name: newPaymentMethod.value,
                icon: 'default'
            },
            ...newPaymentMethods
        ]);
        newPaymentMethod.reset();
    };

    const removeMethod = (method) => {
        setNewPaymentMethods(
            newPaymentMethods.filter(p => p.name !== method)
        );
    };

    const closeWindow = () => {
        setPaymentMethodsToBeDeleted([]);
        setNewAccountName('');
        setNewPaymentMethods([]);
        newPaymentMethod.reset();
        setOpen(false);
    };

    const saveChanges = async () => {
        setEditWindow(true);
    };

    const acceptEditAccount = async () => {
        const update = {
            id: account.id,
            name: newAccountName !== '' && newAccountName !== ' '
                ? newAccountName
                : account.name,
            paymentMethods: {
                add: newPaymentMethods.length > 0
                    ? newPaymentMethods
                    : null,
                delete: paymentMethodsToBeDeleted.length > 0
                    ? paymentMethodsToBeDeleted
                    : null
            }
        };

        closeWindow();
        // Editing accounts is a bit heavy work
        await dispatch(editAccount(update));
        await dispatch(loadTransactions());
        await dispatch(loadPaymentMethods());
    };

    if(!account)
        return null;


    return (
        <>
            <Dialog classes={{ paper: classes.dialog }} maxWidth='md' fullWidth open={open} TransitionComponent={Transition} keepMounted onClose={() => setOpen(false)}>

                <DialogTitle><TextField label='Account name' variant='standard' onChange={(event) => setNewAccountName(event.target.value)} value={newAccountName} size='medium' /></DialogTitle>

                <FormControl fullWidth>

                    <DialogContent>
                        <Typography variant='body1' paragraph>Balance: {account.balance} €</Typography>
                        <Typography variant='body1' paragraph>Logged transactions: {transactionCount}</Typography>
                        <Typography variant='subtitle1'>Payment methods:

                            {
                                paymentMethods.paymentMethods.filter(p => !paymentMethodsToBeDeleted.includes(p.id)).map(p => <ButtonBase
                                    onClick={() => setPaymentMethodsToBeDeleted([...paymentMethodsToBeDeleted, p.id])}
                                    sx={{ ml: 1, mr: 1, textTransform: 'uppercase' }} key={p.id}>{p.name}</ButtonBase>)
                            }

                            {
                                newPaymentMethods.map(p => <ButtonBase onClick={() => removeMethod(p.name)} sx={{ ml: 1, mr: 1, color: 'green', textTransform: 'uppercase' }} key={p.name}>{p.name}</ButtonBase>)
                            }

                        </Typography>
                        <Divider />
                        <br />
                        <TextField size='small' label='Payment method name' type='text' variant='outlined'
                            value={newPaymentMethod.value} onChange={newPaymentMethod.onChange} />
                        <Button sx={{minHeight:'40px'}} onClick={addToNewPaymentMethods} startIcon={<SendIcon />} />
                    </DialogContent>

                    <DialogActions sx={{display:'flex'}}>
                        
                        <Button color='error' onClick={() => deleteAccount()} startIcon={<DeleteForeverIcon />}> Delete account</Button>
                        <Box sx={{flexGrow:1}}/>
                        <Button onClick={closeWindow}>Cancel</Button>
                        <Button variant='contained' onClick={() => saveChanges()} startIcon={<CheckIcon />}> Save</Button>
                    </DialogActions>

                </FormControl>

            </Dialog>


            <Alert open={deleteWindow} setOpen={setDeleteWindow} titleText='Warning, please read!'
                bodyText='Deleting an account is permanent and it can not be undone. Proceed with care!'
                onAccept={acceptDeleteAccount} />
            
            <Alert open={editWindow} setOpen={setEditWindow} titleText='Warning, please read!'
                bodyText='Changes you have done may affect your existing transactions. Proceed with care!'
                onAccept={acceptEditAccount} />

        </>
    );
};

EditAccount.propTypes = {
    children: PropTypes.node,
    setOpen: PropTypes.func,
    open: PropTypes.bool,
    account: PropTypes.object,
    updateAccounts: PropTypes.func,
    paymentMethods: PropTypes.array
};

export default EditAccount;