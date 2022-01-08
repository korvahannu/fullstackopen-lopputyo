/*
User.js will be a router for users to do the following:
- Update your own password or name. No other changes will be supported
- Delete your user account including all categories, accounts, paymentmethods and transactions
- View their user info (check users.js /:id as a comparison)
- Register as a new user

NOTE:
- Users can view their ow
*/

const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const { checkTokenAuthorization } = require('../middlewares/checkTokenAuthorization');

router.get('/', checkTokenAuthorization, async (request, response) => {
    return response.json(request.user);
});

router.get('/deleteAccount/', checkTokenAuthorization, async (request, response, next) => {
    if(request.user.admin) {
        return response.status(401).json({error: 'admins can not their own accounts, please contact system administrator'});
    }

    try {
        // Instead of deleting, we disable an account
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

router.post('/register/', async (request, response, next) => {

    const body = request.body;

    if(!body.email ||!body.username||!body.password) {
        return response.status(400).json({error: 'missing new user info'});
    }

    try {
        const passwordHash = await bcrypt.hash(body.password, 10);

        const user = new User({
            username: body.username,
            name: body.name,
            email: body.email,
            passwordHash,
            admin: false,
            disabled: false
        });

        await user.save();

        return response.json(user);
    }
    catch(error) {
        next(error);
    }

});

module.exports = router;