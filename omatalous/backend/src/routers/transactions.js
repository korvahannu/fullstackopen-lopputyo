const router = require('express').Router();
const Transaction = require('../models/transaction');
const Account = require('../models/account');
const Category = require('../models/category');
const PaymentMethod = require('../models/paymentMethod');
const { checkTokenAuthorization, validateAdminAccount } = require('../middlewares/checkTokenAuthorization');
const responses = require('./responses');

/*
Users can: 
- add a transaction by posting to /
- edit a transaction by put to /:id
- delete a transaction by delete to /:id
- view all of their transaction by get to /
- view a specific transaction by get to /:id

Users can not:
- edit another users transaction by put to :/id
- delete another users transaction by delete to :/id
- view someone elses specific transaction by get to :/id

admin:
- Can do everything under "Users can" and "Users can not"
- Can send a get request to /all/ to retrieve all transactions
*/

router.get('/all/', checkTokenAuthorization, validateAdminAccount,async (request, response, next) => {
    try {

        const result = await Transaction.find({})
        .populate('user', 'name').populate('account', 'name icon').populate('paymentMethod', 'name icon').populate('category', 'name icon');
        return response.json(result);

    }
    catch(error) {
        next(error);
    }
});

router.get('/', checkTokenAuthorization, async (request, response, next) => {

    try {
        const result = await Transaction.find({user:request.user.id})
        .populate('user', 'name').populate('account', 'name icon').populate('paymentMethod', 'name icon').populate('category', 'name icon');
        return response.json(result);
    }
    catch(error) {
        next(error);
    }

});

router.get('/:id', checkTokenAuthorization, async (request, response, next) => {
    try {
        const transaction = await Transaction.findById(request.params.id)
        .populate('user', 'name').populate('account', 'name icon').populate('paymentMethod', 'name icon').populate('category', 'name icon');

        if(!transaction)
            return response.status(400).json(responses.dataDoesNotExist('transaction'));

        if(transaction.user.id.toString() === request.user.id ||request.user.admin) {
            return response.json(transaction);
        }
        else {
            return response.status(401).json(responses.notAuthorized());
        }
    }
    catch(error) {
        next(error);
    }
});

router.post('/', checkTokenAuthorization, async (request, response, next) => {
    try {

        // amount, date, description, user(id), account(id), paymentMethod(id), category(id)
        const body = request.body;
        const account = await Account.findById(body.account);
        const paymentMethod = await PaymentMethod.findById(body.paymentMethod);
        const category = await Category.findById(body.category);
        let type = 'need';

        if(body.type && body.type !== null && body.type !== undefined)
            type = body.type;

        if(!account ||!paymentMethod ||!category)
            return response.status(400).json(responses.fieldsDoNotExist('account, payment method and category'));

        if(account.user.toString() !== request.user.id
        ||paymentMethod.user.toString() !== request.user.id
        ||category.user.toString() !== request.user.id) {
            return response.status(400).json(responses.dataDoesNotExist('new user info'));
        }

        const transaction = new Transaction({
            amount:body.amount,
            description: body.description,
            user:request.user.id,
            account:body.account,
            paymentMethod:body.paymentMethod,
            category: body.category,
            type
        });

        await transaction.save();

        const result = await Transaction.findById(transaction.id.toString())
        .populate('user', 'name').populate('account', 'name icon').populate('paymentMethod', 'name icon').populate('category', 'name icon');

        return response.json(result);

    }
    catch(error) {
        next(error);
    }
});

router.put('/:id', checkTokenAuthorization, async (request, response, next) => {

    const body = request.body;

    let update = {};

    if(body.amount !== undefined)
        update.amount = body.amount;
    if(body.description !== undefined)
        update.description = body.description;

    if(body.account !== undefined) {
        try {
            const account = await Account.findById(body.account);
            if(account && account.user.toString() === request.user.id) {
                update.account = body.account;
            }
        }
        catch(error) {
            return response.status(400).json({error:error.message});
        }
    }

    if(body.paymentMethod !== undefined) {
        try {
            const paymentMethod = await PaymentMethod.findById(body.paymentMethod);

            if(paymentMethod && paymentMethod.user.toString() === request.user.id) {
                update.paymentMethod = body.paymentMethod;
            }
        }
        catch(error) {
            return response.status(400).json({error:error.message});
        }
    }

    if(body.category !== undefined) {
        try {
            const category = await Category.findById(body.category);

            if(category && category.user.toString() === request.user.id) {
                update.category = body.category;
            }
        }
        catch(error) {
            return response.status(400).json({error:error.message});
        }
    }
    
    try {
        const transaction = await Transaction.findById(request.params.id);

        if(!transaction) {
            return response.status(400).json(responses.dataDoesNotExist('transaction'));
        }
        
        if(transaction.user.toString() === request.user.id || request.user.admin) {
            const result = await Transaction.findByIdAndUpdate(request.params.id, update, {new: true})
            .populate('user', 'name').populate('account', 'name icon').populate('paymentMethod', 'name icon').populate('category', 'name icon');
            return response.json(result);
        }
        else {
            return response.status(401).json(responses.notAuthorized());
        }
    }
    catch(error) {
        next(error);
    }
});

router.delete('/:id', checkTokenAuthorization, async (request, response, next) => {
    try {
        const transaction = await Transaction.findById(request.params.id);

        if(!transaction)
            return response.status(400).json(responses.dataDoesNotExist('transaction'));
        
        if(request.user.admin || request.user.id === transaction.user.toString()) {
            await transaction.remove();
            return response.status(200).end();
        }
        else {
            return response.status(401).json(responses.notAuthorized());
        }
    }
    catch(error) {
        next(error);
    }
});

module.exports = router;