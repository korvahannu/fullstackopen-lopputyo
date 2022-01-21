let timer;

const defaultNotification = {
    enabled: false,
    type: 'default',
    message: ''
};

const reducer = (state = defaultNotification, action) => {
    switch(action.type) {
        case 'SET_NOTIFICATION':
            return state = action.notification;
        case 'EMPTY_NOTIFICATION':
            return { enabled: false, type: 'default', message:''};
        default:
            return state;
    }
};

export const setNotification = (type, message, time) => {
    return async dispatch => {
        clearTimeout(timer);
        const notification = {
            enabled: true,
            type,
            message
        };
        dispatch({type:'SET_NOTIFICATION', notification});
        timer = setTimeout(() => {
            dispatch(emptyNotification());
        }, time * 1000);
    };
};

export const emptyNotification = () => {
    return {
        type: 'EMPTY_NOTIFICATION'
    };
};

export default reducer;