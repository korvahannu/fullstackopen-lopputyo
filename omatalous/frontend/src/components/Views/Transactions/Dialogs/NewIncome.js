import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {DialogContent, TextField, Box } from '@mui/material';
import AccountDropdown from '../shared/AccountDropdown';
import CategoryDropdown from '../shared/CategoryDropdown';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { useDispatch } from 'react-redux';
import { addNewIncome } from '../../../../reducers/transactionsReducer';
import format from 'date-fns/format';
import useField from '../../../../hooks/useField';
import DialogBody from './DialogBody';

/*
    Because a dialog box can not open itself, we take open and setOpen
    from the parent component as parameters
*/

const NewOutcomeDialog = ({ open, setOpen }) => {
   
    const dispatch = useDispatch();

    const account = useField('text', 'account');
    const category = useField('text', 'category');
    const amount = useField('number', 'amount');
    const description = useField('text', 'description');
    const [date, setDate] = useState(new Date());

    const addTransaction = () => {
        setOpen(false);

        const outcome = {
            account: account.value,
            category: category.value,
            description:description.value,
            date: format(date, 'yyyy/MM/dd'),
            amount:amount.value
        };

        account.reset();
        category.reset();
        description.reset();
        amount.reset();
        setDate(new Date());
        dispatch(addNewIncome(outcome));
    };

    return (
        <DialogBody open={open} setOpen={setOpen} addTransaction={addTransaction}  title='Add new income' titleColor='green'>

                <DialogContent>
                    <TextField label='Amount' type='number' variant='outlined' fullWidth value={amount.value || ''} onChange={amount.onChange} />
                    <Box sx={{height:32}} />
                    <TextField label='Description' variant='outlined' fullWidth value={description.value || ''} onChange={description.onChange} />
                    <Box sx={{height:32}} />
                    <AccountDropdown value={account.value} onChangeValue={account.onChange} />
                    <Box sx={{height:32}} />
                    <CategoryDropdown value={category.value} onChangeValue={category.onChange} type='income' />
                    <Box sx={{height:32}} />
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

        </DialogBody>
    );
};

NewOutcomeDialog.propTypes = {
    open: PropTypes.bool,
    setOpen: PropTypes.func
};

export default NewOutcomeDialog;