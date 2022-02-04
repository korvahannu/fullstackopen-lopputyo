import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Slide, FormControl, TextField, Box } from '@mui/material';
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
import Alert from '../../../Alert';
import { deleteManyTransactions } from '../../../../reducers/transactionsReducer';
import CheckIcon from '@mui/icons-material/Check';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

const Transition = forwardRef(
    function Transition(props, ref) {
        return <Slide direction='up' ref={ref} {...props} />;
    }
);

const EditTransaction = ({ target, open, setOpen, setSelected }) => {
    const amount = useField('number', 'amount');
    const description = useField('text', 'description');
    const category = useField('text', 'category');
    const account = useField('text', 'account');
    const paymentMethod = useField('text', 'paymentMethod');
    const [date, setDate] = useState(new Date());
    const dispatch = useDispatch();
    const [paymentMethodError, setPaymentMethodError] = useState(false);
    const [deleteWindow, setDeleteWindow] = useState(false);

    useEffect(()=> {
        if(transaction && transaction[0]) {
            amount.setValue(transaction[0].amount);
            description.setValue(transaction[0].description);
            setDate(new Date(parseInt(transaction[0].date.substring(0,4)),
            parseInt(transaction[0].date.substring(5,7))-1,
            parseInt(transaction[0].date.substring(8,10))));
        }
    }, [open]);

    const classes = useStyles();
    const transaction = useSelector(state => {
        return state.transactions.transactions.filter(a => a.id.toString() === target);
    });

    const closeWindow = () => {
        amount.reset();
        description.reset();
        category.reset();
        account.reset();
        paymentMethod.reset();
        setDate(new Date());
        setOpen(false);
    };

    const sendUpdate = () => {

        if (check(account.value)) {
            // If account is set

            if (!check(paymentMethod.value)) {
                // If paymentMethod is not set
                setPaymentMethodError(true);

                return null;
            }
        }

        const update = { // Katso onko null tai mtn
            id: transaction[0].id,
            type: transaction[0].category.type,
            amount: check(amount.value) ? amount.value : null,
            description: check(description.value) ? description.value : null,
            category: check(category.value) ? category.value : null,
            account: check(account.value) ? account.value : null,
            paymentMethod: check(paymentMethod.value) ? paymentMethod.value : null,
            date: check(date) ? format(date, 'yyyy/MM/dd') : null,
        };

        dispatch(updateTransaction(update));
        dispatch(loadAccounts());

        amount.reset();
        description.reset();
        category.reset();
        account.reset();
        paymentMethod.reset();
        setSelected([]);
        setOpen(false);
    };

    const check = (v) => {
        if (v === null ||
            v === undefined ||
            v === '' ||
            v === ' ')
            return false;

        return true;
    };

    const deleteTransaction = () => {
        setDeleteWindow(true);
    };

    const acceptDelete = () => {
        // Delete transaction
        dispatch(deleteManyTransactions([transaction[0].id]));

        amount.reset();
        description.reset();
        category.reset();
        account.reset();
        paymentMethod.reset();
        setOpen(false);
    };

    if (!transaction || !transaction[0])
        return null;

    const currentCategory = transaction[0].category.name;
    const currentAccount = transaction[0].account !== undefined && transaction[0].account !== null
        ? transaction[0].account.name
        : 'X';
    const currentPaymentMethod = transaction[0].paymentMethod !== undefined && transaction[0].paymentMethod !== null
        ? transaction[0].paymentMethod.name
        : 'X';

    return (
        <>
            <Dialog classes={{ paper: classes.dialog }} maxWidth='md' fullWidth open={open} TransitionComponent={Transition} keepMounted onClose={() => closeWindow()}>

                <DialogTitle><EditIcon /> Edit transaction</DialogTitle>

                <FormControl fullWidth>

                    <DialogContent>

                        <TextField fullWidth label='Amount' align='right' size='small' variant='standard' type={amount.type} value={amount.value} onChange={amount.onChange} /> <br /><br />
                        <TextField fullWidth label='Description' align='right' size='small' variant='standard' type={description.type} value={description.value} onChange={description.onChange} /> <br /><br />
                        <CategoryDropdown label={currentCategory} error={false} setError={() => null} value={category.value} onChangeValue={category.onChange} type={transaction[0].category.type} sx={{ ml: 8 }} /><br /><br />
                        <AccountDropdown label={currentAccount} error={false} setError={() => null} value={account.value} onChangeValue={account.onChange} sx={{ ml: 8 }} /><br /><br />

                        <If condition={transaction[0].category.type === 'outcome'}>
                            <PaymentMethodDropdown label={currentPaymentMethod} error={paymentMethodError} setError={setPaymentMethodError} account={account} value={paymentMethod.value || ''} onChangeValue={paymentMethod.onChange} sx={{ ml: 8 }} /> <br/> <br />
                        </If>
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

                    <DialogActions sx={{display:'flex'}}>
                        <Button color='error' onClick={() => deleteTransaction()} startIcon={<DeleteForeverIcon />}> Delete transaction</Button>
                        <Box sx={{flexGrow:1}}/>
                        <Button onClick={() => closeWindow()}>Cancel</Button>
                        <Button variant='contained' onClick={sendUpdate} startIcon={<CheckIcon />}> Save</Button>
                        
                        
                    </DialogActions>

                </FormControl>

            </Dialog>

            <Alert open={deleteWindow} setOpen={setDeleteWindow} titleText='Warning, please read!'
                bodyText='Deleting this transaction is permanent and it can not be undone!'
                onAccept={acceptDelete} />
        </>
    );
};

EditTransaction.propTypes = {
    children: PropTypes.node,
    setOpen: PropTypes.func,
    open: PropTypes.bool,
    target: PropTypes.string,
    setSelected: PropTypes.func
};

export default EditTransaction;