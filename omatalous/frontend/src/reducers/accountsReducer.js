import { getUserAccounts, addNewUserAccount, removeUserAccount, editUserAccount } from '../services/accounts';

const reducer = (state = [], action) => {

    switch (action.type) {
        case 'SET_ACCOUNTS_LOADING':
            return {
                loading: true,
                accounts: state.accounts
            };
        case 'LOAD_ACCOUNTS':
            return { loading: false, accounts: action.accounts };
        case 'ADD_ACCOUNT':
            return {
                loading: false, accounts: [
                    action.account,
                    ...state.accounts
                ]
            };
        case 'DELETE_ACCOUNT': {
            const accounts = state.accounts.filter(
                obj => obj.id !== action.account
            );

            return {
                loading: false,
                accounts
            };
        }
        case 'CHANGE_ACCOUNT_NAME': {
            const accounts = state.accounts.map(obj => {
                if (obj.id !== action.update.id)
                    return obj;
                else {
                    obj.name = action.update.name;
                    return obj;
                }
            });

            return {
                loading: false,
                accounts
            };
        }
        default:
            return state;
    }
};

// TODO: This currently only supports name change
export const editAccount = (update) => {
    return async dispatch => {
        dispatch({type:'SET_ACCOUNTS_LOADING'});
        await editUserAccount(update);
        dispatch({ type: 'CHANGE_ACCOUNT_NAME', update });
    };
};

export const removeAccount = (account) => {
    return async dispatch => {
        dispatch({type:'SET_ACCOUNTS_LOADING'});
        await removeUserAccount(account);
        dispatch({ type: 'DELETE_ACCOUNT', account: account.id });
    };
};

// Note: This also adds paymentMethods to database via account.paymentMethods!
// If you use this remember to dispatch to paymentMethod aswell!
export const addAccount = (account) => {
    return async dispatch => {
        dispatch({type:'SET_ACCOUNTS_LOADING'});
        const result = await addNewUserAccount(account);
        dispatch({ type: 'ADD_ACCOUNT', account: result });
    };
};

export const loadAccounts = () => {
    return async dispatch => {
        dispatch({type:'SET_ACCOUNTS_LOADING'});
        const accounts = await getUserAccounts();
        dispatch({ type: 'LOAD_ACCOUNTS', accounts });
    };
};

export default reducer;