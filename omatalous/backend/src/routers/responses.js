const responses = {

    notAuthorized: () => {
        return {
            error: 'Action is unauthorized for user.'
        };
    },
    
    fieldMustBeDefined: (field) => {
        return {
            error: `Field "${field}" must be defined and can not be null or empty.`
        };
    },

    fieldDoesNotExist: (field) => {
        return {
            error: `Field "${field}" does not exist.`
        };
    },

    fieldsDoNotExist: (field) => {
        return {
            error: `Fields "${field}" does not exist.`
        };
    },

    dataDoesNotExist: (data) => {
        return {
            error: `Could not find matching ${data}: it does not exist.`
        };
    },

    invalidCredentials: () => {
        return {
            error: 'Invalid username or password.'
        };
    },

    accountDisabled: () => {
        return {
            error: 'Account no longer exists.'
        };
    },

    doesNotBelongToUser: (field) => {
        return {
            error: `Field "${field}" does not belong to user.`
        };
    },

    invalidFieldLength: (field) => {
        return {
            error: `Field "${field}" is too short.`
        };
    },

    invalidFieldsLength: (field) => {
        return {
            error: `Fields "${field}" are too short.`
        };
    }
};

module.exports = responses;