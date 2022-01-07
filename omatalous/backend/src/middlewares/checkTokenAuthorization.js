// This is a group of middlewares that extract the user from the database and sets it to request.user
// You can also use this group to check wether or not the user has admin privileges or not
// request.token is handled by ./getTokenFromRequest.js

const User = require('../models/user');
const webtoken = require('jsonwebtoken');
const { WEBTOKEN_SECRET } = require('../utils/config');

// Some actions, such as adding a transaction, require a user login (authorization)
// add this as middleware to router to extract user without copy-pasting code
const checkTokenAuthorization = async (request, response, next) => {

    const token = request.token;

    if(token === null || token === undefined)
        return response.status(401).json({error: 'missing token'});

    try {
        const decodedToken = webtoken.verify(token, WEBTOKEN_SECRET);

        if(!decodedToken) {
            return response.status(401).json({error: 'invalid token'});
        }

        request.user = await User.findById(decodedToken.id);

        if(request.user.disabled || request.user === null || request.user === undefined) {
            return response.status(401).json({error: 'account disabled or deleted'});
        }

        next();
    }
    catch (error) {
        return response.status(400).json({error: 'corrupted or malicious token'});
    }

};

// In some cases we want to prevent regular users from doing an action
// Apply this to router middleware after checkTokenAuthorization to check if account is admin account
const validateAdminAccount = (request, response, next) => {

    if(request.user.admin === false) {
        return response.status(401).json({error: 'unauthorized: only admins can do this'});
    }

    next();
};

module.exports = { checkTokenAuthorization, validateAdminAccount };