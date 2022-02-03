import { getUserTransactions, deleteMany, updateUserTransaction } from '../services/transactions';
import { addOutcome } from '../services/outcomes';
import { addIncome } from '../services/incomes';

const reducer = (state = [], action) => {

    switch (action.type) {
        case 'SET_TRANSACTIONS_LOADING':
            return {
                loading: true,
                transactions: state.transactions
            };
        case 'ADD_TRANSACTION':
            return {
                loading: false,
                transactions: [action.data, ...state.transactions]
            };

        case 'LOAD_TRANSACTIONS':
            return {
                loading: false,
                transactions: action.transactions
            };

        case 'DELETE_TRANSACTIONS': {

            const transactions = state.transactions.filter(
                obj => !action.transactions.includes(obj.id)
            );

            return {
                loading: false,
                transactions
            };
        }

        case 'UPDATE_TRANSACTION': {

            const transactions = state.transactions.map(obj => {
                if (obj.id !== action.update.id)
                    return obj;
                else {
                    return action.update;
                }
            });

            return {
                loading: false,
                transactions
            };
        }

        default:
            return state;
    }
};

export const addNewOutcome = (outcome) => {
    return async dispatch => {
        dispatch({type:'SET_TRANSACTIONS_LOADING'});
        const newOutcome = await addOutcome(outcome);
        dispatch({ type: 'ADD_TRANSACTION', data: newOutcome });
    };
};

export const addNewIncome = (income) => {
    return async dispatch => {
        dispatch({type:'SET_TRANSACTIONS_LOADING'});
        const newIncome = await addIncome(income);
        dispatch({ type: 'ADD_TRANSACTION', data: newIncome });
    };
};

export const loadTransactions = () => {
    return async dispatch => {
        dispatch({type:'SET_TRANSACTIONS_LOADING'});
        const transactions = await getUserTransactions();
        dispatch({ type: 'LOAD_TRANSACTIONS', transactions });
    };
};

export const deleteManyTransactions = (idArray) => {

    return async dispatch => {
        try {
            dispatch({type:'SET_TRANSACTIONS_LOADING'});
            await deleteMany(idArray);
            dispatch({ type: 'DELETE_TRANSACTIONS', transactions: idArray });
        }
        catch (error) {
            dispatch({type:'error'});
            console.log(error);
        }
    };

};

export const updateTransaction = (update) => {
    return async dispatch => {
        dispatch({type:'SET_TRANSACTIONS_LOADING'});
        const result = await updateUserTransaction(update);
        return dispatch({ type: 'UPDATE_TRANSACTION', update: result });
    };
};

export default reducer;