const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const addDefaultsToUser = require('../utils/addDefaultsToUser');

router.post('/', async (request, response, next) => {

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

        await addDefaultsToUser(user.id.toString());

        return response.json(user);
    }
    catch(error) {
        next(error);
    }

});

module.exports = router;