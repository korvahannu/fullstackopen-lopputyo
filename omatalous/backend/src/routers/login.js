const router = require('express').Router();
const bcrypt = require('bcrypt');
const webtoken = require('jsonwebtoken');
const User = require('../models/user');
const { WEBTOKEN_SECRET } = require('../utils/config');

router.post('/', async (request, response) => {

    const body = request.body;

    const user = await User.findOne({username: body.username});

    const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash);

    if(!user || !passwordCorrect) {
        return response.status(401).json({error: 'invalid username or password'});
    }

    if(user.disabled === true)
        return response.status(400).json({error: 'user account has been removed, contact sysadmin for re-activation'});

    const _token = {
        username: user.username,
        id: user._id
    };

    const token = webtoken.sign(_token,WEBTOKEN_SECRET);


    return response.status(200).send( { token, username: user.username, name: user.name } );

});

module.exports = router;