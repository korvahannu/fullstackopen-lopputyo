const router = require('express').Router();
const bcrypt = require('bcrypt');
const webtoken = require('jsonwebtoken');
const User = require('../models/user');
const { WEBTOKEN_SECRET } = require('../utils/config');
const Session = require('../models/session');
const responses = require('./responses');

router.post('/', async (request, response) => {

    const body = request.body;

    const user = await User.findOne({username: body.username});

    const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash);

    if(!user || !passwordCorrect) {
        return response.status(401).json(responses.invalidCredentials());
    }

    if(user.disabled === true)
        return response.status(400).json(responses.accountDisabled());

    const _token = {
        username: user.username,
        id: user._id
    };

    const token = webtoken.sign(_token,WEBTOKEN_SECRET);

    await Session.deleteMany({user:user._id.toString()});

    const session = new Session({
        token,
        user: user._id.toString(),
        date: new Date()
    });

    await session.save();


    return response.status(200).send( { token, username: user.username, name: user.name, avatar:user.avatar, email: user.email } );

});

module.exports = router;