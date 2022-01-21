import React from 'react';
import './style.css';
import FormAddNew from './FormAddNew';
import { logout } from '../../reducers/userReducer';
import { empty } from '../../reducers/transactionsReducer';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import TransactionsDataGrid from '../TransactionsDataGrid';


const IncomeOutcomeSheet = () => {

    const dispatch = useDispatch();
    const transactionList = useSelector(state => state.transactions);    

    const simpleLogout = () => {
        dispatch(empty());
        dispatch(logout());
    };

    return(
        <div id="wrapper">
            <button onClick={simpleLogout}>Log out</button>
            <FormAddNew />
            <div style={{height:'600px', width:'1024px'}}>
                <TransactionsDataGrid transactions={transactionList} />
            </div>
        </div>
    );
};

export default IncomeOutcomeSheet;