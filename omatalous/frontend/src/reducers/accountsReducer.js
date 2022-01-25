import { getUserAccounts, addNewUserAccount, removeUserAccount } from '../services/accounts';

const reducer = (state = [], action) => {
    switch(action.type) {
        case 'LOAD_ACCOUNTS':
            return action.accounts;
        case 'ADD_ACCOUNT':
            return [
                action.account,
                ...state
            ];
        case 'DELETE_ACCOUNT':
            return state.filter(
              obj => obj.id !== action.account  
            );
        default:
            return state;
    }
};

export const removeAccount = (account) => {
    return async dispatch => {
        await removeUserAccount(account);
        dispatch({type:'DELETE_ACCOUNT', account:account.id});
    };
};

// Note: This also adds paymentMethods to database via account.paymentMethods!
// If you use this remember to dispatch to paymentMethod aswell!
export const addAccount = (account) => {
    return async dispatch => {
        const result = await addNewUserAccount(account);
        dispatch({type:'ADD_ACCOUNT', account:result});
    };
};

export const loadAccounts = () => {
    return async dispatch => {
        const accounts = await getUserAccounts();
        dispatch({type:'LOAD_ACCOUNTS', accounts});
    };
};

export default reducer;