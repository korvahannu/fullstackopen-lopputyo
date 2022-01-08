const router = require('express').Router();
const Account = require('../models/account');
const { checkTokenAuthorization, validateAdminAccount } = require('../middlewares/checkTokenAuthorization');

/*
Admin:
- full access to all accounts
- Can delete specific account of a user
- Can edit any account of any user

User:
- view own categories
- view specific accounts that they own
- delete own accounts
- update own account
*/

router.get('/all/', checkTokenAuthorization, validateAdminAccount, async (request, response, next) => {

    try {
        const result = await Account.find({});

        return response.json(result);
    }
    catch(error) {
        next(error);
    }

});

router.get('/', checkTokenAuthorization, async (request, response, next) => {

    const userId = request.user.id;

    try {
        const result = await Account.find({user:userId});

        return response.json(result);
    }
    catch(error) {
        next(error);
    }

});

router.get('/:id', checkTokenAuthorization, async (request, response, next) => {

    try {
        const account = await Account.findById(request.params.id);

        if(!account)
            return response.status(400).json({error:'account does not exist'});

        if(request.user.admin ||request.user.id === account.user.toString()) {
            return response.json(account);
        }
        else {
            return response.status(401).json({error:'unauthorized'});
        }
    }
    catch(error) {
        next(error);
    }

});

router.post('/', checkTokenAuthorization, async (request, response, next) => {
    try {

        const body = request.body;

        if(body.balance === null || body.balance === undefined)
            body.balance = 0;
        
        if(body.name === null || body.name === undefined || body.name === '')
            return response.status(400).json({error: 'account name can not be null'});

        let icon = 'default';

        if(body.icon !== null && body.icon !== undefined)
            icon = body.icon;
        
        const account = new Account({
            name: body.name,
            balance: body.balance,
            icon,
            user: request.user.id
        });

        await account.save();

        return response.json(account);

    }
    catch(error) {
        next(error);
    }
});

router.delete('/:id', checkTokenAuthorization, async (request, response, next) => {

    try {
        const account = await Account.findById(request.params.id);

        if(!account)
            return response.status(400).json({error:'account does not exist'});

        if(request.user.admin || request.user.id === account.user.toString()) {
            await account.remove();
            return response.json(200).end();
        }
        else {
            response.status(401).json({error: 'unauthorized'});
        }
    }
    catch(error) {
        next(error);
    }

});

router.put('/:id', checkTokenAuthorization, async (request, response, next) => {
    const body = request.body;

    let updatedAccount = {};

    if(body.name !== undefined)
        updatedAccount.name = body.name;
    
    if (body.balance !== undefined)
        updatedAccount.balance = body.balance;
    
    if (body.icon !== undefined)
        updatedAccount.icon = body.icon;

    try {
        const account = await Account.findById(request.params.id);

        if(!account)
            return response.status(400).json({error:'account does not exist'});

        if(account.user.toString() === request.user.id || request.user.admin) {
            const result = await Account.findByIdAndUpdate(request.params.id, updatedAccount, {new: true});
            return response.json(result);
        }
        else {
            return response.status(401).json({error: 'unauthorized'});
        }
    }
    catch(error) {
        next(error);
    }
});

module.exports = router;