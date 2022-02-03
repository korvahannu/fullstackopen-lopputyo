const router = require('express').Router();
const User = require('../models/user');
const VerificationToken = require('../models/verificationToken');
const responses = require('./responses');
const nodemailer = require('../utils/nodemailer');
const bcrypt = require('bcrypt');
const { PASSWORD_RESET_TOKEN_EXPIRATION } = require('../utils/config');

// POST /api/forgot/
router.post('/', async (request, response) => {
    const body = request.body;
    const user = await User.findOne({email: body.email});

    if(!user)
        return response.status(404).json(responses.dataDoesNotExist('User'));

    await VerificationToken.deleteMany({user:user.id});
    
    let characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let token ='';

    for(let i = 0; i < 25; i++) {
        token += characters[Math.floor(Math.random() * characters.length)];
    }

    const verificationToken = new VerificationToken({
        token: token,
        email: body.email,
        user: user.id
    });

    nodemailer.sendVerificationEmail(
        user.name,
        user.email,
        token
    );

    user.disabled = true;   // We disable user untill new password has been set.
    await user.save();
    await verificationToken.save();
});

// POST /api/forgot/changepassword/
router.post('/changepassword', async (request, response) => {
    const body = request.body;

    if(body.password === null || body.password === undefined || body.password.length < 5)
        return response.status(400).json(responses.invalidFieldLength('Password'));

    const verificationToken = await VerificationToken.findOne({
        email: body.email,
        token: body.token,
    });

    if(!verificationToken)
        return response.status(404).json(responses.dataDoesNotExist('Verification Token'));

    // Check that token is not too old yet
    const difference = new Date().getTime() - verificationToken.createdAt;

    if(difference > PASSWORD_RESET_TOKEN_EXPIRATION) { 
        await verificationToken.remove();
        return response.status(401).json({error: 'password reset token expired'});
    }
    
    const user = await User.findOne({email: verificationToken.email});
    const passwordHash = await bcrypt.hash(body.password, 10);
    user.passwordHash = passwordHash;
    user.disabled = false;
    await user.save();
    await verificationToken.remove();
});

module.exports = router;