const Log = require('../models/log');

const databaseLogger = async (message, type, userId) => {
    const log = {};

    if(notEmpty(message)) {
        log.message = message;
    }

    if(notEmpty(type) && validateLogType(type)) {
        log.type = type;
    }
    else
        log.type = 'Unknown';

    if(notEmpty(userId)) {
        log.userId = userId;
    }

    try {
        const result = await new Log(log);
        await result.save();
    }
    catch(error) {
        console.log('WARNING! SERVER UNABLE TO LOG ACTION ' + message + ' ' + type + ' ' + userId);
    }
};

const notEmpty = (str) => {
    if(str !== null && str !== undefined && str !== '')
        return true;
    
    return false;
};

const validateLogType = (str) => {

    if(str === 'User action' ||str === 'Admin action' ||str === 'Notification' ||str ==='Warning' ||str === 'Error' ||str === 'Unknown') {
        return true;
    }

    return false;

};

module.exports = { databaseLogger };