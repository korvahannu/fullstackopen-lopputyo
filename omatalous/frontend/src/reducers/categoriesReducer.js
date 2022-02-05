import { getUserCategories } from '../services/categories';
const reducer = (state = [], action) => {
    switch(action.type) {
        case 'SET_CATEGORIES_LOADING':
            return {
                loading: true,
                categories: state.categories
            };
        case 'LOAD_CATEGORIES':
            return {loading: false, categories: action.categories};
        case 'ADD_CATEGORY':
            return {
                loading: false,
                categories: [
                    action.category,
                    ...state.categories
                ]
            };
        case 'DELETE_CATEGORIES': // Set action.categories to an array of id's to remove
            return {
                loading: false,
                categories: state.categories.filter(
                    obj => !action.categories.includes(obj.id)
                )
            };
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