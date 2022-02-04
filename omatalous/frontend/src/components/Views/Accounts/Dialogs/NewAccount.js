import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Divider, Typography, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, Slide, FormControl, ButtonBase } from '@mui/material';
import { forwardRef } from 'react';
import useStyles from '../../../styles';
import useField from '../../../../hooks/useField';
import { addAccount } from '../../../../reducers/accountsReducer';
import { useDispatch } from 'react-redux';
import { loadPaymentMethods } from '../../../../reducers/paymentMethodsReducer';
import SendIcon from '@mui/icons-material/Send';
import CheckIcon from '@mui/icons-material/Check';

const Transition = forwardRef(
    function Transition(props, ref) {
        return <Slide direction='up' ref={ref} {...props} />;
    }
);

const defaultPaymentMethods = [{icon:'default', name:'Bank Transfer'},
{icon:'default', name:'Cash'},
{icon:'default', name:'Debit Card'}];

const NewAccount = ({ open, setOpen }) => {

    const classes = useStyles();
    const name = useField('text', 'name');
    const balance = useField('number', 'balance');
    const paymentMethod = useField('text', 'paymentMethod');
    const [paymentMethods, setPaymentMethods] = useState([...defaultPaymentMethods]);
    const dispatch = useDispatch();

    const [balanceError, setBalanceError] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [paymentMethodError, setPaymentMethodError] = useState(false);

    useEffect(()=> {
        setPaymentMethods([...defaultPaymentMethods]);
    }, [open]);

    const addPaymentMethod = () => {
        setPaymentMethods([
            {
                name:paymentMethod.value,
                icon:'default'
            },
            ...paymentMethods
        ]);
        paymentMethod.reset();
    };

    const addNewAccount = async () => {

        let error = false;

        if(!simpleValidate(name.value)) {
            setNameError(true);
            error = true;
        }
        if(!simpleValidate(balance.value)) {
            setBalanceError(true);
            error = true;
        }
        if(paymentMethods.length > 0) {
            if(!simpleValidate(paymentMethods[0])) {
                setPaymentMethodError(true);
                error = true;
            }
        }
        else {
            setPaymentMethodError(true);
            error = true;
        }


        if(error)
            return null;

        const acc = {
            name:name.value,
            balance:balance.value,
            paymentMethods: paymentMethods
        };

        setOpen(false);

        await dispatch(addAccount(acc));
        await dispatch(loadPaymentMethods());
        emptyInput();
    };

    const emptyInput = () => {
        name.reset();
        balance.reset();
        paymentMethod.reset();
        setPaymentMethods([]);
        setPaymentMethodError(false);
        setBalanceError(false);
        setNameError(false);
    };

    const closeWindow = () => {
        emptyInput();
        setOpen(false);
    };

    const removeMethod = (method) => {
        setPaymentMethods(
            paymentMethods.filter(p => p.name !== method)
        );
    };

    return (
        <Dialog classes={{ paper: classes.dialog }} maxWidth='md' fullWidth open={open} TransitionComponent={Transition} keepMounted onClose={() => closeWindow()}>

            <DialogTitle>Create a new account</DialogTitle>

            <FormControl fullWidth>

                <DialogContent>
                    <TextField error={nameError} onFocus={()=>setNameError(false)} label='Account name' type='text' variant='outlined' fullWidth value={name.value || ''} onChange={name.onChange} />
                    <Box sx={{ height: 32 }} />
                    <TextField error={balanceError} onFocus={()=>setBalanceError(false)} label='Initial balance' type='number' variant='outlined' fullWidth value={balance.value || ''} onChange={balance.onChange} />
                    <Box sx={{ height: 32 }} />
                    {
                        paymentMethods.length > 0
                        ? <Typography variant=''>Payment methods: </Typography>
                        : null
                    }
                    {
                        paymentMethods.map(m => <ButtonBase onClick={()=>removeMethod(m.name)} color='error' sx={{mr:2}} key={m.name}><Typography variant='overline'>{m.name} </Typography></ButtonBase>)
                    }
                    <Divider /> <br />
                    <TextField error={paymentMethodError} onFocus={()=>setPaymentMethodError(false)} size='small' value={paymentMethod.value} onChange={paymentMethod.onChange} label='Payment method name' type='text' variant='outlined' />
                    <Button onClick={addPaymentMethod} startIcon={<SendIcon />} sx={{minHeight:'40px'}} />
                    {
                        paymentMethodError && <Typography variant='subtitle2' color='error'>You need to add at least 1 payment method to your new account.</Typography>
                    }
                    
                </DialogContent>

                <DialogActions>

                    <Button onClick={() => closeWindow()}>Cancel</Button>
                    <Button variant='contained' onClick={() => addNewAccount()} endIcon={<CheckIcon />}> Accept</Button>
                    
                </DialogActions>

            </FormControl>

        </Dialog>
    );
};


const simpleValidate = (input) => {
    if(input !== ''
    && input !== null
    && input !== undefined
    && input !== ' ')
        return true;
    return false;
};

NewAccount.propTypes = {
    children: PropTypes.node,
    setOpen: PropTypes.func,
    updateAccounts: PropTypes.func,
    open: PropTypes.bool
};

export default NewAccount;