import { getUserPaymentMethods } from '../services/paymentMethods';

const reducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_PAYMENTMETHODS_LOADING':
            return {
                loading: true,
                paymentMethods: state.paymentMethods
            };
        case 'ADD_ABSTRACT_PAYMENTMETHODS':
            return {
                loading: false, paymentMethods: [
                    ...state.paymentMethods,
                    ...action.paymentMethods
                ]
            };

        case 'LOAD_PAYMENTMETHODS':
            return {
                loading: false,
                paymentMethods: action.paymentMethods
            };

        default:
            return state;
    }
};

// Adds paymentMethods to the redux store but not database, see accountsReducer.js
export const addAbstractPaymentMethods = (paymentMethods) => {
    return dispatch => {
        dispatch({ type: 'ADD_ABSTRACT_PAYMENTMETHODS', paymentMethods });
    };
};

export const loadPaymentMethods = () => {
    return async dispatch => {
        dispatch({type:'SET_PAYMENTMETHODS_LOADING'});
        const paymentMethods = await getUserPaymentMethods();
        dispatch({ type: 'LOAD_PAYMENTMETHODS', paymentMethods });
    };
};

export default reducer;