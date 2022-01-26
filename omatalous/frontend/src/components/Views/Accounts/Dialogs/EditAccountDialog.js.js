import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonBase, Dialog, DialogTitle, TextField, DialogContent, DialogActions, Slide, FormControl, Typography, Divider } from '@mui/material';
import { forwardRef } from 'react';
import useStyles from '../../../styles';
import useField from '../../../../hooks/useField';
import { useSelector, useDispatch } from 'react-redux';
import {removeAccount, editAccount} from '../../../../reducers/accountsReducer';
import { loadPaymentMethods } from '../../../../reducers/paymentMethodsReducer';
import { loadTransactions } from '../../../../reducers/transactionsReducer';

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

    const paymentMethods = useSelector(state => state.paymentMethods.filter(method => {
        if(!account)
            return false;
        if(method.account === null || method.account.id !== account.id)
            return false;
        return true;
    }));

    if(!account)
        return null;

    const deleteAccount = async () => {
        if(window,confirm(`Are you sure you want to delete account "${account.name}"? Transactions and payment methods linked to this will remain as ghosts.`)) {
            await dispatch(removeAccount(account));
            setOpen(false);
        }
    };

    const addToNewPaymentMethods = () => {
        setNewPaymentMethods([
            {
                name:newPaymentMethod.value,
                icon:'default'
            },
            ...newPaymentMethods
        ]);
        console.log(newPaymentMethods);
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

        if(!window.confirm('Are you sure? These changes can not be undone.'))
            return closeWindow();

        const update = {
            id: account.id,
            name:newAccountName !== '' && newAccountName !== ' '
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

        // Editing accounts is a bit heavy work
        await dispatch(editAccount(update));
        await dispatch(loadTransactions());
        await dispatch(loadPaymentMethods());
        closeWindow();
    };


    return (
        <Dialog classes={{ paper: classes.dialog }} maxWidth='md' fullWidth open={open} TransitionComponent={Transition} keepMounted onClose={() => setOpen(false)}>

            <DialogTitle>{account.name}<TextField sx={{marginLeft:'490px'}} label='New name' variant='standard' onChange={(event)=>setNewAccountName(event.target.value)} value={newAccountName} size='medium'/></DialogTitle>

            <FormControl fullWidth>

                <DialogContent>
                    <Typography variant='body1' paragraph>Balance: {account.balance}$</Typography>
                    <Typography variant='body1' paragraph>Logged transactions: 6154</Typography>
                    <Typography variant='subtitle1'>Payment methods: 

                    {
                        paymentMethods.filter(p => !paymentMethodsToBeDeleted.includes(p.id)).map(p => <ButtonBase
                            onClick={()=> setPaymentMethodsToBeDeleted([...paymentMethodsToBeDeleted, p.id])}
                            sx={{ml:1, mr:1, textTransform:'uppercase'}} key={p.id}>{p.name}</ButtonBase>)
                    }

                    {
                        newPaymentMethods.map(p => <ButtonBase onClick={() => removeMethod(p.name)} sx={{ml:1, mr:1, color:'green', textTransform:'uppercase'}} key={p.name}>{p.name}</ButtonBase>)
                    }

                    </Typography>
                    <Divider />
                    <br />
                    <TextField size='small' label='Paymentmethod name' type='text' variant='outlined'
                    value={newPaymentMethod.value} onChange={newPaymentMethod.onChange} />
                    <Button onClick={addToNewPaymentMethods}>+</Button>
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => saveChanges()}>Confirm edit</Button>
                    <Button color='error' onClick={() => deleteAccount()}>Delete account</Button>
                    <Button onClick={closeWindow}>Cancel</Button>
                </DialogActions>

            </FormControl>

        </Dialog>
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