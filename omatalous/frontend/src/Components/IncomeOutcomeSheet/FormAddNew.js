import react from "react";

const FormAddNew = ({AddNewTransaction}) => {

    const handleEvent = (event) => {
        event.preventDefault();

        const account = event.target.account.value;
        const paymentMethod = event.target.paymentMethod.value;
        const amount = event.target.amount.value;
        const description = event.target.description.value;
        const category = event.target.category.value;
        const date = event.target.date.value;


        AddNewTransaction(
            {
                account,
                paymentMethod,
                amount,
                description,
                category,
                date
            }
        )
    };

    const clearForm = (event) => {
        event.preventDefault();
        document.getElementById('form-add-new-transaction').reset();
    };

    return (
        <form onSubmit={handleEvent} id="form-add-new-transaction">
            <p>Account
                <select name="account">
                    <option value="Primary account">Primary account</option>
                    <option value="Savings account">Savings account</option>
                </select>
            </p>
            <p>Payment method
                <select name="paymentMethod">
                    <option value="Debit card">Debit card</option>
                    <option value="Credit card">Credit card</option>
                    <option value="Credit card 2">Credit card</option>
                    <option value="Bank transfer">Bank transfer</option>
                    <option value="Cash">Cash</option>
                </select>
            </p>
            <p>Category
                <select name="category">
                    <option value="Groceries">Groceries</option>
                    <option value="Gas">Gas</option>
                    <option value="Hobbies">Hobbies</option>
                    <option value="Other">Other</option>
                </select>
            </p>
            <p>Amount (€) <input type="number" name="amount"></input></p>
            <p>Description <input type="text" name="description"></input></p>
            <p>Date <input type="date" name="date"></input></p>
            <button type="submit">Add</button>
            <button onClick={clearForm}>Clear</button>
        </form>
    )
};

export default FormAddNew;