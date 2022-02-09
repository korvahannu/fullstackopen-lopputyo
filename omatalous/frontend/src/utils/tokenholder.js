let token = '';

export const getToken = () => {
    return token;
};

export const setToken = newToken => {
    token = `bearer ${newToken}`;
};

export const getConfig = () => ({
    headers: {
        Authorization: getToken()
        
    }
});