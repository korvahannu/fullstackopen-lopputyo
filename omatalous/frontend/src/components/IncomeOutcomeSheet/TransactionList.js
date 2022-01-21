import React from 'react';
import './style.css';
import PropTypes from 'prop-types';

const TransactionList = ({transactionList}) => {
    return (
        <div>
            <h2>Most recent</h2>

            <table>
                <thead>
                    <tr>
                        <th>Account</th>
                        <th>Payment method</th>
                        <th>Category</th>
                        <th>Amount</th>
                        <th>Description</th>
                        <th>Date</th>
                    </tr>
                </thead>

                <tbody>
                    
                    {
                        transactionList.map(transaction => {

                            return(
                                <tr key={`${transaction.amount}${transaction.description}`}>
                                    <th>
                                        {transaction.account.name}
                                    </th>
                                    <th>
                                        {transaction.paymentMethod.name}
                                    </th>
                                    <th>
                                        {transaction.category.name}
                                    </th>
                                    <th>
                                        {transaction.amount}
                                    </th>
                                    <th>
                                        {transaction.description}
                                    </th>
                                    <th>
                                        {transaction.date}
                                    </th>


                                </tr>
                            );
                        })
                    }

                </tbody>
            </table>
        </div>
    );
};

TransactionList.propTypes = {
    transactionList: PropTypes.array
};

export default TransactionList;