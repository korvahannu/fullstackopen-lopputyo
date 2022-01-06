const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const { checkTokenAuthorization, validateAdminAccount } = require('../middlewares/checkTokenAuthorization');

/*
Admin:
- view full user list
- add a new user => Possibly a new route for user registration?

User:
- Can view own account information

TODO:
- Ability delete user
- Ability to update user
- If user is removed, remove all of his categories, accounts, paymentmethods etc.
*/

router.get('/', checkTokenAuthorization, validateAdminAccount, async (request, response) => {

    const result = await User.find({});
    return response.json(result);
    
});

router.get('/:id', checkTokenAuthorization, async(request, response, next) => {

    const id = request.params.id;

    if(request.user.id !== id && !request.user.admin) {
        return response.status(401).json({error: 'unauthorized'});
    }

    try {
        const user = await User.findById(id);

        if(user) {
            return response.json(user);
        }
        else {
            return response.status(400).json({error: 'user with given id does not exist'});
        }
    }
    catch(error) {
        next(error);
    }
    
});

router.post('/', checkTokenAuthorization, validateAdminAccount, async (request, response, next) => {

    const body = request.body;

    if(body.password === undefined || body.username === undefined) {
        return response.status(400).json({error: 'username or password undefined'});
    }

    if(body.name === undefined ||body.name === null || body.name === '') {
        return response.status(400).json({error: 'name missing or invalid'});
    }

    if(body.password.length < 5 || body.username.length < 5) {
        return response.status(400).json({error: 'username and password must be over 5 characters'});
    }

    try {
        const passwordHash = await bcrypt.hash(body.password, 10);

        const user = new User({
            username: body.username,
            name: body.name,
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