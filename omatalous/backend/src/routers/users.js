const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const { checkTokenAuthorization, validateAdminAccount } = require('../middlewares/checkTokenAuthorization');

router.get('/', async (request, response) => {

    const result = await User.find({});
    return response.json(result);
    
});

router.post('/', checkTokenAuthorization, validateAdminAccount, async (request, response) => {

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

    const passwordHash = await bcrypt.hash(body.password, 10);

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash
    });

    const result = await user.save();

    response.json(result);

});

module.exports = router;