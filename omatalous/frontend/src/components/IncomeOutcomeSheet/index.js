import React from 'react';
import './style.css';
import FormAddNew from './FormAddNew';
import TransactionList from './TransactionList';
import { logout } from '../../reducers/userReducer';
import { empty } from '../../reducers/transactionsReducer';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';


const IncomeOutcomeSheet = () => {

    const dispatch = useDispatch();
    const transactionList = useSelector(state => state.transactions);

    const AddNewTransaction = () => {
        console.log('This feature is to do');
    };
    

    const simpleLogout = () => {
        dispatch(empty());
        dispatch(logout());
    };

    return(
        <div id="wrapper">
            <button onClick={simpleLogout}>Log out</button>
            <FormAddNew AddNewTransaction={AddNewTransaction} />
            <TransactionList transactionList={transactionList} />
        </div>
    );
};

export default IncomeOutcomeSheet;