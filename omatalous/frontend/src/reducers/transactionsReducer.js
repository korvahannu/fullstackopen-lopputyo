import { getUserTransactions, deleteMany } from '../services/transactions';
import { addOutcome } from '../services/outcomes';

const reducer = (state = [], action) => {
    switch(action.type) {
        case 'ADD':
            return [...state, action.data];

        case 'EMPTY':
            return [];

        case 'LOAD':
            return action.transactions;

        case 'DELETEMANY':

            return state.filter(
                obj => !action.transactions.includes(obj.id)
            );

        default:
            return state;
    }
};

export const empty = () => {

    return dispatch => {
        dispatch({type:'EMPTY'});
    };
};

export const addNewOutcome = (outcome) => {
    return async dispatch => {
        const newOutcome = await addOutcome(outcome);
        dispatch({type:'ADD', data:newOutcome});
    };
};

export const load = () => {

    return async dispatch => {
        const transactions = await getUserTransactions();
        dispatch({type:'LOAD', transactions});
    };
};

export const deleteManyTransactions = (idArray) => {

    return async dispatch => {
        try {
            await deleteMany(idArray);
            dispatch({type:'DELETEMANY', transactions:idArray});
        }
        catch(error) {
            console.log(error);
        }
    };

};

export default reducer;