import { getUserTransactions, deleteMany } from '../services/transactions';
import { addOutcome } from '../services/outcomes';
import { addIncome } from '../services/incomes';

const reducer = (state = [], action) => {
    switch(action.type) {
        case 'ADD_TRANSACTION':
            return [action.data, ...state];
            
        case 'LOAD_TRANSACTIONS':
            return action.transactions;

        case 'DELETE_TRANSACTIONS':

            return state.filter(
                obj => !action.transactions.includes(obj.id)
            );

        default:
            return state;
    }
};

export const addNewOutcome = (outcome) => {
    return async dispatch => {
        const newOutcome = await addOutcome(outcome);
        dispatch({type:'ADD_TRANSACTION', data:newOutcome});
    };
};

export const addNewIncome = (income) => {
    return async dispatch => {
        const newIncome = await addIncome(income);
        dispatch({type:'ADD_TRANSACTION', data: newIncome});
    };
};

export const loadTransactions = () => {
    return async dispatch => {
        const transactions = await getUserTransactions();
        dispatch({type:'LOAD_TRANSACTIONS', transactions});
    };
};

export const deleteManyTransactions = (idArray) => {

    return async dispatch => {
        try {
            await deleteMany(idArray);
            dispatch({type:'DELETE_TRANSACTIONS', transactions:idArray});
        }
        catch(error) {
            console.log(error);
        }
    };

};

export default reducer;