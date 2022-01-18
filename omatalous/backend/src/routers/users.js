const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const { validateAdminAccount } = require('../middlewares/checkTokenAuthorization');
const responses = require('./responses');

/*
Admin:
- view full user list
- add a new user => Possibly a new route for user registration?

User:
- Can view own account information
*/

router.get('/', validateAdminAccount, async (request, response) => {

    const result = await User.find({});
    return response.json(result);
    
});

router.delete('/:id', validateAdminAccount, async (request,response, next) => {
    try {
        const user = User.findById(request.params.id);

        if(!user)
            return response.status(400).json(responses.dataDoesNotExist('user'));

        await user.remove();
        return response.json(200).end();
    }
    catch(error) {
        next(error);
    }
});

router.get('/:id', async(request, response, next) => {

    const id = request.params.id;

    if(request.user.id !== id && !request.user.admin) {
        return response.status(401).json(responses.notAuthorized());
    }

    try {
        const user = await User.findById(id);

        if(user) {
            return response.json(user);
        }
        else {
            return response.status(400).json(responses.dataDoesNotExist('user'));
        }
    }
    catch(error) {
        next(error);
    }
    
});

router.post('/', validateAdminAccount, async (request, response, next) => {

    const body = request.body;
    let name = '';

    if(body.password === undefined || body.username === undefined) {
        return response.status(400).json(responses.fieldsDoNotExist('username and password'));
    }

    if(body.name !== undefined &&body.name !== null && body.name !== '')
        name = body.name;

    if(body.password.length < 5 || body.username.length < 5) {
        return response.status(400).json(responses.invalidFieldsLength('account and password'));
    }

    try {
        const passwordHash = await bcrypt.hash(body.password, 10);

        const user = new User({
            username: body.username,
            name,
            email: body.email,
            passwordHash
        });
    
        const result = await user.save();
    
        response.json(result);
    }
    catch(error) {
        next(error);
    }
});

module.exports = router;