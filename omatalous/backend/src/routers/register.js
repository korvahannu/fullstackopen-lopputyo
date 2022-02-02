const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const addDefaultsToUser = require('../utils/addDefaultsToUser');
const responses = require('./responses');
const nodemailer = require('../utils/nodemailer');

router.post('/confirm/:id', async (request, response) => {

    const user = await User.findOne({confirmationCode: request.params.id});
    
    if(user) {
        if(user.status !== 'Active') {
            user.status = 'Active';
            
            try {
                await user.save();
            }
            catch(error) {
                return response.status(500).json({message: error});
            }
        }
        else {
            return response.status(200).end();
        }
    }
    else {
        return response.status(404).json({error: 'User not found'});
    }
});

router.post('/', async (request, response, next) => {

    const body = request.body;

    if(!body.email ||!body.username||!body.password) {
        return response.status(400).json(responses.fieldMustBeDefined('User info'));
    }

    try {

        if(body.password.length < 5)
            return response.status(400).json(responses.invalidFieldLength('password'));
        if(body.username.length < 5)
            return response.status(400).json(responses.invalidFieldLength('username'));

        const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        
        if(!emailRegexp.test(body.email))
            return response.status(400).json(responses.fieldMustBeDefined('email'));

        const passwordHash = await bcrypt.hash(body.password, 10);

        let characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let confirmationCode ='';

        for(let i = 0; i < 25; i++) {
            confirmationCode += characters[Math.floor(Math.random() * characters.length)];
        }

        const user = new User({
            username: body.username,
            name: body.name,
            email: body.email,
            passwordHash,
            admin: false,
            disabled: false,
            avatar: body.avatar,
            status: 'Pending',
            confirmationCode
        });

        const url = request.protocol + '://' + request.get('host');

        nodemailer.sendConfirmationEmail(
            user.username,
            user.email,
            url,
            user.confirmationCode
        );

        await user.save();

        await addDefaultsToUser(user.id.toString());

        return response.json(user);
    }
    catch(error) {
        next(error);
    }

});

module.exports = router;