import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';

const PaymentMethodDropdown = ({label, account, onChangeValue, value, error, setError}) => {

    const paymentMethods = useSelector(state => state.paymentMethods);

    return (
        <FormControl fullWidth>
            <InputLabel id='new-transaction-paymentmethod-label'>{label ||'Payment Method'}</InputLabel>
            <Select error={error} onFocus={() => setError(false)} name="paymentMethod"  value={value}  defaultValue={''} onChange={onChangeValue} fullWidth label={label || 'Payment Method'} labelId='new-transaction-paymentmethod-label'>
                {
                    paymentMethods.paymentMethods.map(r => {
                        if(!account ||r.account===null||r.account.id.toString() !== account.value) 
                            return null;


                        return <MenuItem value={r.id} key={r.id}>{r.name}</MenuItem>;
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