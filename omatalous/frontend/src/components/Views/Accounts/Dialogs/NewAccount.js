import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Divider, Typography, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, Slide, FormControl, ButtonBase } from '@mui/material';
import { forwardRef } from 'react';
import useStyles from '../../../styles';
import useField from '../../../../hooks/useField';
import { addAccount } from '../../../../reducers/accountsReducer';
import { useDispatch } from 'react-redux';
import { loadPaymentMethods } from '../../../../reducers/paymentMethodsReducer';

const Transition = forwardRef(
    function Transition(props, ref) {
        return <Slide direction='up' ref={ref} {...props} />;
    }
);

const NewAccount = ({ open, setOpen }) => {

    const classes = useStyles();
    const name = useField('text', 'name');
    const balance = useField('number', 'balance');
    const paymentMethod = useField('text', 'paymentMethod');
    const [paymentMethods, setPaymentMethods] = useState([]);
    const dispatch = useDispatch();

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

            <DialogTitle>Add a new account</DialogTitle>

            <FormControl fullWidth>

                <DialogContent>
                    <TextField label='Account name' type='text' variant='outlined' fullWidth value={name.value || ''} onChange={name.onChange} />
                    <Box sx={{ height: 32 }} />
                    <TextField label='Initial balance' type='number' variant='outlined' fullWidth value={balance.value || ''} onChange={balance.onChange} />
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
                    <Typography>Add payment methods:</Typography>
                    <TextField size='small' value={paymentMethod.value} onChange={paymentMethod.onChange} label='Paymentmethod name' type='text' variant='outlined' />
                    <Button onClick={addPaymentMethod}>+</Button>
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => addNewAccount()}>Add</Button>
                    <Button onClick={() => closeWindow()}>Cancel</Button>
                </DialogActions>

            </FormControl>

        </Dialog>
    );
};

NewAccount.propTypes = {
    children: PropTypes.node,
    setOpen: PropTypes.func,
    updateAccounts: PropTypes.func,
    open: PropTypes.bool
};

export default NewAccount;