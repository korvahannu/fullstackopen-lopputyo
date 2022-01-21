import React from 'react';
import './style.css';
import FormAddNew from './FormAddNew';
import { useSelector } from 'react-redux';
import TransactionsDataGrid from '../TransactionsDataGrid';


const IncomeOutcomeSheet = () => {

    const transactionList = useSelector(state => state.transactions);    

    return(
        <div id="wrapper">
            <FormAddNew />
            <div style={{height:'600px', width:'1024px'}}>
                <TransactionsDataGrid transactions={transactionList} />
            </div>
        </div>
    );
};

export default IncomeOutcomeSheet;