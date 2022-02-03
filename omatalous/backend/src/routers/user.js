const router = require('express').Router();
const User = require('../models/user');
const Session = require('../models/session');
const responses = require('./responses');
const bcrypt = require('bcrypt');

router.get('/', async (request, response) => {
    return response.json(request.user);
});

router.post('/deleteAccount/', async (request, response, next) => {
    if(request.user.admin) {
        return response.status(401).json(responses.notAuthorized());
    }

    try {
        // Instead of deleting, we disable an account and remove sessions
        // TODO: We should delete accounts since users have right to be forgotten
        const session = await Session.findOne({user:request.user.id.toString()});
        await session.remove();
        const user = await User.findByIdAndUpdate(request.user.id, {disabled: true}, {new: true});
        return response.json(user);
    }
    catch(error) {
        next(error);
    }
});

/*
    The following route is to test if user has inputted their password correctly
    e.g. in the edit profile view
*/
router.post('/passwordTest/', async (request, response) => {
    const body = request.body;

    const passwordCorrect = await bcrypt.compare(body.password, request.user.passwordHash);

    if(passwordCorrect) {
        return response.status(200).json({success:true});
    }
    else {
        return response.status(401).end();
    }
});

router.put('/updateAccount/', async (request, response, next) => {
    // name, password

    const body = request.body;

    let updatedUser = {};

    if(body.name !== undefined && body.name !== null)
        updatedUser.name = body.name;

    // TODO: Maybe instead of external links we use internal resources?
    if(body.avatar !== undefined)
        updatedUser.avatar = body.avatar;
    
    if (body.password !== undefined && body.password !== null) {
        if(body.password.length < 5)
            return response.status(400).json(responses.invalidFieldLength('password'));

        updatedUser.passwordHash = await bcrypt.hash(body.password, 10);
    } 

    try {
        const result = await User.findByIdAndUpdate(request.user.id, updatedUser, {new: true});
        return response.json({token: request.token, username: result.username, name: result.name, avatar:result.avatar, email: result.email});
    }
    catch(error) {
        next(error);
    }
});

module.exports = router;