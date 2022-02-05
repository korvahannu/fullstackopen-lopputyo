import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';

const PaymentMethodDropdown = ({label, account, onChangeValue, value, error, setError}) => {

    const paymentMethods = useSelector(state => state.paymentMethods);

    if(!paymentMethods||paymentMethods.loading||!paymentMethods.paymentMethods)
        return null;

    return (
        <FormControl fullWidth>
            <InputLabel id='new-transaction-paymentmethod-label'>{label ||'Payment Method'}</InputLabel>
            <Select error={error} onFocus={() => setError(false)} name="paymentMethod"  value={value}  defaultValue={''} onChange={onChangeValue} fullWidth label={label || 'Payment Method'} labelId='new-transaction-paymentmethod-label'>
                {
                    paymentMethods.paymentMethods.map(r => {
                        if(!account)
                            return null;

                        if(r.account === null) // Incase user has deleted the account this paymentmethod belongs to
                            return null;

                        if(r.account.id.toString() === account.value)
                            return <MenuItem value={r.id} key={r.id}>{r.name}</MenuItem>;
                        else
                            return null;
                    })
                }
            </Select>
        </FormControl>
    );
};

PaymentMethodDropdown.propTypes = {
    onChangeValue: PropTypes.func,
    value: PropTypes.string,
    account: PropTypes.object,
    error: PropTypes.bool,
    setError: PropTypes.func,
    label: PropTypes.string
};

export default PaymentMethodDropdown;