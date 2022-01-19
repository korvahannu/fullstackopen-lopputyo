import React, { useState } from 'react';
import AccountDropdown from '../AccountDropdown';
import CategoryDropdown from '../CategoryDropdown';
import PaymentMethodDropdown from '../PaymentMethodDropdown';
import useField from '../../hooks/useField';
import { useDispatch } from 'react-redux';
import { add as addNewTransaction } from '../../reducers/transactionsReducer';

const FormAddNew = () => {

    const dispatch = useDispatch();

    const [account, setAccount] = useState('');
    const [category, setCategory] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const amount = useField('text', 'amount');
    const description = useField('text', 'description');
    const date = useField('date', 'date');

    const onChange = (event) => {
        switch(event.target.name.toString()) {
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
        const transaction = {
            account,
            category,
            paymentMethod,
            description:description.value,
            date: date.value,
            amount: amount.value
        };

        setAccount('');
        setCategory('');
        setPaymentMethod('');
        description.reset();
        amount.reset();
        date.reset();

        dispatch(addNewTransaction(transaction));
    };
    
    return (
        <div>
            <AccountDropdown onChangeValue={onChange} />
            <PaymentMethodDropdown onChangeValue={onChange}/>
            <CategoryDropdown onChangeValue={onChange} />
            <input { ...amount.getInputParameters } placeholder='amount'/>
            <input { ...description.getInputParameters } placeholder='description' />
            <input { ...date.getInputParameters } />
            <button onClick={addTransaction}>Submit</button>
        </div>
    );
    
};

export default FormAddNew;