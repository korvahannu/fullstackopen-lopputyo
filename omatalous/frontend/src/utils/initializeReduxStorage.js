import { useDispatch } from 'react-redux';
import { loadAccounts } from '../reducers/accountsReducer';
import { loadCategories } from '../reducers/categoriesReducer';
import { loadPaymentMethods } from '../reducers/paymentMethodsReducer';
import { loadTransactions } from '../reducers/transactionsReducer';
import { tryToLoadUserFromStorage } from '../reducers/userReducer';

const initializeReduxStorage = () => {

    const dispatch = useDispatch();

    const init = () => {
        dispatch(loadTransactions());
        dispatch(loadCategories());
        dispatch(loadAccounts());
        dispatch(loadPaymentMethods());
    };

    const loadUserFromStorage = () => {
        dispatch(tryToLoadUserFromStorage());
    };

    return { init, loadUserFromStorage };
};

export default initializeReduxStorage;