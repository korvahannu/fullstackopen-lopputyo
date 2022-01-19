import React, { useState } from 'react';
import './style.css';
import FormAddNew from './FormAddNew';
import TransactionList from './TransactionList';
import { logout } from '../../reducers/userReducer';
import { useDispatch } from 'react-redux';
import CategoryDropdown from '../CategoryDropdown';

const initTransactionList = [
    {
        account: 'Primary',
        paymentMethod: 'Credit card 1',
        amount: -50.56,
        description: 'Did some grocery shopping',
        category: 'Groceries',
        date: '2022-01-22'
    },
    {
        account: 'Primary',
        paymentMethod: 'Credit card 1',
        amount: 25,
        description: 'Gas',
        category: 'Gas',
        date: '2022-01-22'
    },
    {
        account: 'Primary',
        paymentMethod: 'Credit card 1',
        amount: 5000,
        description: 'Payday',
        category: 'Other',
        date: '2022-01-22'
    },
];

const IncomeOutcomeSheet = () => {

    const dispatch = useDispatch();

    const [transactionList, setTransactionList] = useState(initTransactionList);

    const AddNewTransaction = (transaction) => {
        setTransactionList([
            ...transactionList,
            transaction
        ]);
    };
    
    const reducer = (total, current) => {
        return total + current.amount;
    };

    const count = transactionList.reduce(reducer, 0);

    const simpleLogout = () => {
        dispatch(logout());
    };


    return(
        <div id="wrapper">
            <button onClick={simpleLogout}>Log out</button>
            <CategoryDropdown onChangeValue={(event) => console.log(event.target.value)} />
            <FormAddNew AddNewTransaction={AddNewTransaction} />
            <p>Balance: {count}</p>
            <TransactionList transactionList={transactionList} />
        </div>
    );
};

export default IncomeOutcomeSheet;