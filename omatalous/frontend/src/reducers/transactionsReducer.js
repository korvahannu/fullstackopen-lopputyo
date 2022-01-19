import { getUserTransactions, addUserTransactions } from '../services/transactions';

const reducer = (state = [], action) => {
    switch(action.type) {
        case 'ADD':
            return [...state, action.data];

        case 'EMPTY':
            return [];

        case 'LOAD':
            return action.transactions;

        default:
            return state;
    }
};

export const empty = () => {

    return dispatch => {
        dispatch({type:'EMPTY'});
    };
};

export const add = (transaction) => {

    return async dispatch => {
        const data = await addUserTransactions(transaction);
        dispatch({type:'ADD', data});
    };
};

export const load = () => {

    return async dispatch => {
        const transactions = await getUserTransactions();
        dispatch({type:'LOAD', transactions});
    };
};

export default reducer;