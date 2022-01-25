import React from 'react';
import usePaymentMethods from '../../../../hooks/usePaymentMethods';
import PropTypes from 'prop-types';
import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';

const PaymentMethodDropdown = ({account, onChangeValue, value}) => {

    const paymentMethods = usePaymentMethods();

    return (
        <FormControl fullWidth>
            <InputLabel id='new-transaction-paymentmethod-label'>Payment Method</InputLabel>
            <Select name="paymentMethod"  value={value}  defaultValue={''} onChange={onChangeValue} fullWidth label='Payment Method' labelId='new-transaction-paymentmethod-label'>
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
    account: PropTypes.object
};

export default PaymentMethodDropdown;