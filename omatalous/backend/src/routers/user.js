const router = require('express').Router();
const responses = require('./responses');
const bcrypt = require('bcrypt');

const User = require('../models/user');
const Session = require('../models/session');
const Income = require('../models/income');
const Outcome = require('../models/outcome');
const Category = require('../models/category');
const Account = require('../models/account');
const PaymentMethod = require('../models/paymentMethod');

router.get('/', async (request, response) => {
    return response.json(request.user);
});

router.post('/deleteAccount/', async (request, response, next) => {
    if(request.user.admin) {
        return response.status(401).json(responses.notAuthorized());
    }

    try {
        const session = await Session.findOne({user:request.user.id.toString()});
        await session.remove();

        await User.findByIdAndRemove(request.user.id);

        await Income.deleteMany({user:request.user.id});
        await Outcome.deleteMany({user:request.user.id});
        await Category.deleteMany({user:request.user.id});
        await Account.deleteMany({user:request.user.id});
        await PaymentMethod.deleteMany({user:request.user.id});

        return response.status(200).end();
    }
    catch(error) {
        next(error);
    }
});

/*
    The following route is to test if user has inputted their password correctly
    e.g. in the edit profile view
*/
router.post('/passwordTest/', async (request, response) => {
    const body = request.body;

    const passwordCorrect = await bcrypt.compare(body.password, request.user.passwordHash);

    if(passwordCorrect) {
        return response.status(200).json({success:true});
    }
    else {
        return response.status(401).end();
    }
});

router.put('/updateAccount/', async (request, response, next) => {
    // name, password

    const body = request.body;

    let updatedUser = {};

    if(body.name !== undefined && body.name !== null)
        updatedUser.name = body.name;

    // TODO: Maybe instead of external links we use internal resources?
    if(body.avatar !== undefined)
        updatedUser.avatar = body.avatar;
    
    if (body.password !== undefined && body.password !== null) {
        if(body.password.length < 5)
            return response.status(400).json(responses.invalidFieldLength('password'));

        updatedUser.passwordHash = await bcrypt.hash(body.password, 10);
    } 

    try {
        const result = await User.findByIdAndUpdate(request.user.id, updatedUser, {new: true});
        return response.json({token: request.token, username: result.username, name: result.name, avatar:result.avatar, email: result.email});
    }
    catch(error) {
        next(error);
    }
});

module.exports = router;