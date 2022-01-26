import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { DialogContent, TextField, Box } from '@mui/material';
import AccountDropdown from '../shared/AccountDropdown';
import CategoryDropdown from '../shared/CategoryDropdown';
import PaymentMethodDropdown from '../shared/PaymentMethodDropdown';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { useDispatch } from 'react-redux';
import { addNewOutcome } from '../../../../reducers/transactionsReducer';
import format from 'date-fns/format';
import useField from '../../../../hooks/useField';
import DialogBody from './DialogBody';
import { loadAccounts } from '../../../../reducers/accountsReducer';


/*
    Because a dialog box can not open itself, we take open and setOpen
    from the parent component as parameters
*/
const NewOutcomeDialog = ({ open, setOpen }) => {

    const dispatch = useDispatch();

    const account = useField('text', 'account');
    const category = useField('text', 'category');
    const paymentMethod = useField('text', 'paymentMethod');
    const amount = useField('number', 'amount');
    const description = useField('text', 'description');
    const [date, setDate] = useState(new Date());

    const addTransaction = async  () => {
        setOpen(false);

        const outcome = {
            account: account.value,
            category: category.value,
            paymentMethod: paymentMethod.value,
            description: description.value,
            date: format(date, 'yyyy/MM/dd'),
            amount: amount.value
        };

        account.reset();
        paymentMethod.reset();
        category.reset();
        description.reset();
        amount.reset();
        setDate(new Date());

        await dispatch(addNewOutcome(outcome));
        await dispatch(loadAccounts());
    };

    return (
        <DialogBody open={open} setOpen={setOpen} addTransaction={addTransaction} title='Add new outcome' titleColor='red'>

            <DialogContent>
                <TextField label='Amount' type='number' variant='outlined' fullWidth value={amount.value || ''} onChange={amount.onChange} />
                <Box sx={{ height: 32 }} />
                <TextField label='Description' variant='outlined' fullWidth value={description.value || ''} onChange={description.onChange} />
                <Box sx={{ height: 32 }} />
                <CategoryDropdown value={category.value} onChangeValue={category.onChange} type='outcome' />
                <Box sx={{ height: 32 }} />
                <AccountDropdown value={account.value} onChangeValue={account.onChange} />
                <Box sx={{ height: 32 }} />
                <PaymentMethodDropdown value={paymentMethod.value} account={account} onChangeValue={paymentMethod.onChange} />
                <Box sx={{ height: 32 }} />
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

        </DialogBody>
    );
};

NewOutcomeDialog.propTypes = {
    open: PropTypes.bool,
    setOpen: PropTypes.func
};

export default NewOutcomeDialog;