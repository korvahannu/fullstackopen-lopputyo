import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Dialog, DialogContent, DialogTitle, DialogActions, Slide, FormControl, TextField, Box } from '@mui/material';
import { forwardRef } from 'react';
import AccountDropdown from './AccountDropdown';
import CategoryDropdown from './CategoryDropdown';
import PaymentMethodDropdown from './PaymentMethodDropdown';
import useStyles from '../../../styles';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { useDispatch } from 'react-redux';
import { add as addNewTransaction } from '../../../../reducers/transactionsReducer';
import format from 'date-fns/format';


const Transition = forwardRef(
    function Transition(props, ref) {
        return <Slide direction='up' ref={ref} {...props} />;
    }
);

const NewTransactionDialog = ({ open, setOpen }) => {
   
    const dispatch = useDispatch();
    const classes = useStyles();
    const [account, setAccount] = useState('');
    const [category, setCategory] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date());

    const onChangeSelect = (event) => {
        switch (event.target.name.toString()) {
            case 'account':
                setAccount(event.target.value);
                break;

            case 'paymentMethod':
                setPaymentMethod(event.target.value);
                break;

            case 'category':
                setCategory(event.target.value);
                break;
        }
    };

    const addTransaction = () => {
        setOpen(false);
        const transaction = {
            account,
            category,
            paymentMethod,
            description,
            date: format(date, 'yyyy/MM/dd'),
            amount
        };

        setAccount('');
        setCategory('');
        setPaymentMethod('');
        setDescription('');
        setAmount('');
        setDate(new Date());

        dispatch(addNewTransaction(transaction));
    };

    return (
        <Dialog classes={{ paper: classes.dialog }} maxWidth='md' fullWidth open={open} TransitionComponent={Transition} keepMounted onClose={() => setOpen(false)}>

            <DialogTitle>Add new transaction</DialogTitle>

            <FormControl fullWidth>

                <DialogContent>
                    <TextField label='Amount' type='number' variant='outlined' fullWidth value={amount || ''} onChange={(event) => setAmount(event.target.value)} />
                    <Box sx={{height:32}} />
                    <TextField label='Description' variant='outlined' fullWidth value={description || ''} onChange={(event) => setDescription(event.target.value)} />
                    <Box sx={{height:32}} />
                    <AccountDropdown value={account} onChangeValue={onChangeSelect} />
                    <Box sx={{height:32}} />
                    <CategoryDropdown value={category} onChangeValue={onChangeSelect} />
                    <Box sx={{height:32}} />
                    <PaymentMethodDropdown value={paymentMethod} onChangeValue={onChangeSelect} />
                    <Box sx={{height:32}} />
                    <DesktopDatePicker
                        fullWidth
                        label="Date"
                        value={date}
                        onChange={(newValue) => setDate(newValue)}
                        renderInput={(params) => <TextField {...params} />}
                        inputFormat='yyyy/MM/dd'
                        mask='____/__/__'
                    />
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => addTransaction()}>Add</Button>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                </DialogActions>

            </FormControl>

        </Dialog>
    );
};

NewTransactionDialog.propTypes = {
    open: PropTypes.bool,
    setOpen: PropTypes.func
};

export default NewTransactionDialog;