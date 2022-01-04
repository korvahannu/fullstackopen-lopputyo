import react from "react";
import './style.css';

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
                                        {transaction.account}
                                    </th>
                                    <th>
                                        {transaction.paymentMethod}
                                    </th>
                                    <th>
                                        {transaction.category}
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
                            )
                        })
                    }

                </tbody>
            </table>
        </div>
    );
};

export default TransactionList;