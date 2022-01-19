import React from 'react';
import usePaymentMethods from '../hooks/usePaymentMethods';
import PropTypes from 'prop-types';

const PaymentMethodDropdown = ({onChangeValue}) => {

    const paymentMethods = usePaymentMethods();

    return (
        <select name="paymentMethod" onChange={onChangeValue}>
            <option value=''>---</option>
            {
                paymentMethods.paymentMethods.map(r => <option value={r.id} key={r.id}>{r.name}</option>)
            }
        </select>
    );
};

PaymentMethodDropdown.propTypes = {
    onChangeValue: PropTypes.func
};

export default PaymentMethodDropdown;