const router = require('express').Router();
const Outcome = require('../models/outcome');
const Account = require('../models/account');
const Category = require('../models/category');
const PaymentMethod = require('../models/paymentMethod');
const { validateAdminAccount } = require('../middlewares/checkTokenAuthorization');
const responses = require('./responses');

/*
Users can: 
- add a outcome by posting to /
- edit a outcome by put to /:id
- delete a outcome by delete to /:id
- view all of their outcome by get to /
- view a specific outcome by get to /:id

Users can not:
- edit another users outcome by put to :/id
- delete another users outcome by delete to :/id
- view someone elses specific outcome by get to :/id

admin:
- Can do everything under "Users can" and "Users can not"
- Can send a get request to /all/ to retrieve all outcome
*/

router.get('/all/', validateAdminAccount,async (request, response, next) => {
    try {

        const result = await Outcome.find({})
        .populate('user', 'name').populate('account', 'name icon').populate('paymentMethod', 'name icon').populate('category', 'name icon');
        return response.json(result);

    }
    catch(error) {
        next(error);
    }
});

router.get('/', async (request, response, next) => {

    try {
        const result = await Outcome.find({user:request.user.id})
        .populate('user', 'name').populate('account', 'name icon').populate('paymentMethod', 'name icon').populate('category', 'name icon');
        return response.json(result);
    }
    catch(error) {
        next(error);
    }

});

router.get('/:id', async (request, response, next) => {
    try {
        const outcome = await Outcome.findById(request.params.id)
        .populate('user', 'name').populate('account', 'name icon').populate('paymentMethod', 'name icon').populate('category', 'name icon');

        if(!outcome)
            return response.status(400).json(responses.dataDoesNotExist('outcome'));

        if(outcome.user.id.toString() === request.user.id ||request.user.admin) {
            return response.json(outcome);
        }
        else {
            return response.status(401).json(responses.notAuthorized());
        }
    }
    catch(error) {
        next(error);
    }
});

router.post('/', async (request, response, next) => {
    try {

        // amount, date, description, user(id), account(id), paymentMethod(id), category(id)
        const body = request.body;

        const account = await Account.findById(body.account);
        const paymentMethod = await PaymentMethod.findById(body.paymentMethod);
        const category = await Category.findById(body.category);
        let type = 'need';

        if(body.type && body.type !== null && body.type !== undefined) {
            if(body.type === 'want')
            type = body.type;
        }

        if(!account ||!paymentMethod ||!category ||!body.date)
            return response.status(400).json(responses.fieldsDoNotExist('date, account, payment method and category'));
        
        if(category.type !== 'outcome')
            response.status(400).json(responses.invalidType('category'));

        if(account.user.toString() !== request.user.id
        ||paymentMethod.user.toString() !== request.user.id
        ||category.user.toString() !== request.user.id) {
            return response.status(400).json(responses.dataDoesNotExist('new user info'));
        }

        const outcome = new Outcome({
            amount:Math.abs(body.amount),
            description: body.description,
            user:request.user.id,
            account:body.account,
            paymentMethod:body.paymentMethod,
            category: body.category,
            date:body.date,
            type
        });

        account.balance -= outcome.amount;

        await outcome.save();
        await account.save();

        const result = await Outcome.findById(outcome.id.toString())
        .populate('user', 'name').populate('account', 'name icon').populate('paymentMethod', 'name icon').populate('category', 'type name icon');

        return response.json(result);

    }
    catch(error) {
        next(error);
    }
});

router.put('/:id', async (request, response, next) => {

    const body = request.body;

    let update = {};

    if(body.amount !== undefined)
        update.amount = body.amount;
    if(body.description !== undefined)
        update.description = body.description;
    if(body.date !== undefined)
        update.date = body.date;

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
        const outcome = await Outcome.findById(request.params.id);

        if(!outcome) {
            return response.status(400).json(responses.dataDoesNotExist('outcome'));
        }
        
        if(outcome.user.toString() === request.user.id || request.user.admin) {
            const result = await Outcome.findByIdAndUpdate(request.params.id, update, {new: true})
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

router.delete('/:id', async (request, response, next) => {
    try {
        const outcome = await Outcome.findById(request.params.id);

        if(!outcome)
            return response.status(400).json(responses.dataDoesNotExist('outcome'));
        
        if(request.user.admin || request.user.id === outcome.user.toString()) {
            await outcome.remove();
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