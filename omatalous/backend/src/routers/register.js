const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const addDefaultsToUser = require('../utils/addDefaultsToUser');
const responses = require('./responses');

router.post('/', async (request, response, next) => {

    const body = request.body;

    if(!body.email ||!body.username||!body.password) {
        return response.status(400).json(responses.fieldMustBeDefined('User info'));
    }

    try {

        if(body.password.length < 5)
            return response.status(400).json(responses.invalidFieldLength('password'));

        const passwordHash = await bcrypt.hash(body.password, 10);

        const user = new User({
            username: body.username,
            name: body.name,
            email: body.email,
            passwordHash,
            admin: false,
            disabled: false,
            avatar: body.avatar
        });

        await user.save();

        await addDefaultsToUser(user.id.toString());

        return response.json(user);
    }
    catch(error) {
        next(error);
    }

});

module.exports = router;