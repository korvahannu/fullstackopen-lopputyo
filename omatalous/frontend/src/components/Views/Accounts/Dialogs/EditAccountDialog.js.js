import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonBase, Dialog, DialogTitle, TextField, DialogContent, DialogActions, Slide, FormControl, Typography, Divider } from '@mui/material';
import { forwardRef } from 'react';
import useStyles from '../../../styles';
import useField from '../../../../hooks/useField';
import { useSelector, useDispatch } from 'react-redux';
import {removeAccount} from '../../../../reducers/accountsReducer';

const Transition = forwardRef(
    function Transition(props, ref) {
        return <Slide direction='up' ref={ref} {...props} />;
    }
);

const EditAccount = ({ account, open, setOpen }) => {

    const classes = useStyles();
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
        newPaymentMethod.reset();
    };

    const removeMethod = (method) => {
        setNewPaymentMethods(
            newPaymentMethods.filter(p => p.name !== method)
        );
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
                        paymentMethods.map(p => <ButtonBase sx={{ml:1, mr:1, textTransform:'uppercase'}} key={p.id}>{p.name}</ButtonBase>)
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
                    <Button onClick={() => console.log('asd')}>Confirm edit</Button>
                    <Button color='error' onClick={() => deleteAccount()}>Delete account</Button>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
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