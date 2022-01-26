import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Slide, FormControl, Typography, TextField } from '@mui/material';
import { forwardRef } from 'react';
import useStyles from '../../../styles';
import { useSelector, useDispatch } from 'react-redux';
import CategoryDropdown from '../shared/CategoryDropdown';
import AccountDropdown from '../shared/AccountDropdown';
import PaymentMethodDropdown from '../shared/PaymentMethodDropdown';
import useField from '../../../../hooks/useField';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import format from 'date-fns/format';
import { updateTransaction } from '../../../../reducers/transactionsReducer';
import { loadAccounts } from '../../../../reducers/accountsReducer';
import If from '../../../../utils/If';

const Transition = forwardRef(
    function Transition(props, ref) {
        return <Slide direction='up' ref={ref} {...props} />;
    }
);

const EditTransaction = ({ target, open, setOpen }) => {
    const amount = useField('number', 'amount');
    const description = useField('text', 'description');
    const category = useField('text', 'category');
    const account = useField('text', 'account');
    const paymentMethod = useField('text', 'paymentMethod');
    const [date, setDate] = useState(new Date());
    const dispatch = useDispatch();

    const classes = useStyles();
    const transaction = useSelector(state => {
        return state.transactions.filter(a => a.id.toString() === target);
    });

    const closeWindow = ( ) => {
        amount.reset();
        description.reset();
        category.reset();
        account.reset();
        paymentMethod.reset();
        setDate(new Date());
        setOpen(false);
    };

    const sendUpdate = async () => {

        const update = { // Katso onko null tai mtn
            id: transaction[0].id,
            type: transaction[0].category.type,
            amount: check(amount.value) ? amount.value : null,
            description: check(description.value) ? description.value : null,
            category:check(category.value) ? category.value : null,
            account: check(account.value) ? account.value : null,
            paymentMethod:check(paymentMethod.value) ? paymentMethod.value : null,
            date:check(date) ? format(date, 'yyyy/MM/dd') : null,
        };

        await dispatch(updateTransaction(update));
        await dispatch(loadAccounts());

        amount.reset();
        description.reset();
        category.reset();
        account.reset();
        paymentMethod.reset();
        setOpen(false);
    };

    const check = (v) => {
        if(v === null ||
            v === undefined ||
            v === '' ||
            v === ' ')
            return false;
        
        return true;
    };

    if (!transaction || !transaction[0])
        return null;

    const currentAmount = transaction[0].amount;
    const currentDescription = transaction[0].description;
    const currentCategory = transaction[0].category.name;
    const currentAccount = transaction[0].account !== undefined && transaction[0].account !== null
        ? transaction[0].account.name
        : 'X';
    const currentPaymentMethod = transaction[0].paymentMethod !== undefined && transaction[0].paymentMethod !== null
        ? transaction[0].paymentMethod.name
        : 'X';
    const currentDate = transaction[0].date;

    return (
        <Dialog classes={{ paper: classes.dialog }} maxWidth='md' fullWidth open={open} TransitionComponent={Transition} keepMounted onClose={() => closeWindow()}>

            <DialogTitle>Edit transaction</DialogTitle>

            <FormControl fullWidth>

                <DialogContent>

                    <Typography variant='body1'><b>Amount➤</b> {currentAmount}</Typography>
                    <TextField sx={{ ml: 8 }} align='right' size='small' variant='standard' type={amount.type} value={amount.value} onChange={amount.onChange} />
                    <Typography variant='body1'><b>Description➤</b> {currentDescription}</Typography>
                    <TextField sx={{ ml: 8 }} align='right' size='small' variant='standard' type={description.type} value={description.value} onChange={description.onChange} />
                    <Typography variant='body1'><b>Category➤</b> {currentCategory}</Typography>
                    <CategoryDropdown value={category.value} onChangeValue={category.onChange} type={transaction[0].category.type} sx={{ ml: 8 }} />
                    <Typography variant='body1'><b>Account➤</b> {currentAccount}</Typography>
                    <AccountDropdown value={account.value} onChangeValue={account.onChange} sx={{ ml: 8 }} />

                    <If condition={transaction[0].category.type === 'outcome'}>
                        <Typography variant='body1'><b>Payment method➤</b> {currentPaymentMethod} </Typography>
                        <PaymentMethodDropdown account={account} value={paymentMethod.value||''} onChangeValue={paymentMethod.onChange} sx={{ ml: 8 }} />
                    </If>

                    <Typography variant='body1'><b>Date➤</b> {currentDate}</Typography>
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
                    <Button onClick={sendUpdate}>Save</Button>
                    <Button onClick={() => closeWindow()}>Cancel</Button>
                </DialogActions>

            </FormControl>

        </Dialog>
    );
};

EditTransaction.propTypes = {
    children: PropTypes.node,
    setOpen: PropTypes.func,
    open: PropTypes.bool,
    target: PropTypes.string
};

export default EditTransaction;