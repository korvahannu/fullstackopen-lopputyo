const router = require('express').Router();
const User = require('../models/user');
const Session = require('../models/session');
const { checkTokenAuthorization } = require('../middlewares/checkTokenAuthorization');
const responses = require('./responses');

router.get('/', checkTokenAuthorization, async (request, response) => {
    return response.json(request.user);
});

router.post('/deleteAccount/', checkTokenAuthorization, async (request, response, next) => {
    if(request.user.admin) {
        return response.status(401).json(responses.notAuthorized());
    }

    try {
        // Instead of deleting, we disable an account and remove sessions
        const session = await Session.findOne({user:request.user.id.toString()});
        await session.remove();
        const user = await User.findByIdAndUpdate(request.user.id, {disabled: true}, {new: true});
        return response.json(user);
    }
    catch(error) {
        next(error);
    }
});

router.put('/updateAccount/', checkTokenAuthorization, async (request, response, next) => {
    // name, password

    const body = request.body;

    let updatedUser = {};

    if(body.name !== undefined)
        updatedUser.name = body.name;
    
    if (body.password !== undefined)
        updatedUser.password = body.password;

    try {
        const result = await User.findByIdAndUpdate(request.user.id, updatedUser, {new: true});
        return response.json(result);
    }
    catch(error) {
        next(error);
    }
});

module.exports = router;