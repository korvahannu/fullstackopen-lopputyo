import { getUserCategories } from '../services/categories';
// TODO: do isloading such as in transactionsreducer?
const reducer = (state = [], action) => {
    switch(action.type) {
        case 'LOAD_CATEGORIES':
            return action.categories;
        case 'ADD_CATEGORY':
            return [
                action.category,
                ...state
            ];
        case 'DELETE_CATEGORIES': // Set action.categories to an array of id's to remove
            return state.filter(
                obj => !action.categories.includes(obj.id)
            );
        default:
            return state;
    }
};

// TODO: category-service has no option to add categories
export const addNewCategory = (category) => {

    return async dispatch => {
        
        dispatch({type:'ADD_CATEGORY', category});
    };
};

// TODO: category-service and router does not support multideleting
export const deleteManyCategories = (categories) => {

    return async dispatch => {
        dispatch({type:'DELETE_CATEGORIES', categories});
    };
};

export const loadCategories = () => {

    return async dispatch => {
        const categories = await getUserCategories();
        dispatch({type:'LOAD_CATEGORIES', categories});
    };
};


export default reducer;