import { getUserCategories, addNewCategory, deleteUserCategory, editUserCategory } from '../services/categories';
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
                    obj => obj.id !== action.categoryId
                )
            };
        case 'EDIT_CATEGORY':
            return {
                loading: false,
                categories: state.categories.map(
                    obj => {
                        if(obj.id !== action.category.id) {
                            return obj;
                        }
                        else {
                            return action.category;
                        }
                    }
                )
            };
        default:
            return state;
    }
};

export const addCategory = (body) => {

    return async dispatch => {
        dispatch({type:'SET_CATEGORIES_LOADING'});
        const category = await addNewCategory(body);
        dispatch({type:'ADD_CATEGORY', category});
    };
};

export const deleteCategory = (categoryId) => {

    return async dispatch => {
        dispatch({type:'SET_CATEGORIES_LOADING'});
        await deleteUserCategory(categoryId);
        dispatch({type:'DELETE_CATEGORIES', categoryId});
    };
};

export const editCategory = (categoryId, body) => {
    return async dispatch => {
        dispatch({type:'SET_CATEGORIES_LOADING'});
        const category = await editUserCategory(categoryId, body);
        dispatch({type:'EDIT_CATEGORY', category});
    };
};

export const loadCategories = () => {

    return async dispatch => {
        const categories = await getUserCategories();
        dispatch({type:'LOAD_CATEGORIES', categories});
    };
};


export default reducer;