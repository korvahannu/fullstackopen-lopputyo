const router = require('express').Router();
const Income = require('../models/income');
const Account = require('../models/account');
const Category = require('../models/category');
const { validateAdminAccount } = require('../middlewares/checkTokenAuthorization');
const responses = require('./responses');



router.get('/all/', validateAdminAccount,async (request, response, next) => {
    try {

        const result = await Income.find({})
        .populate('user', 'name').populate('account', 'name icon').populate('category', 'name icon');
        return response.json(result);

    }
    catch(error) {
        next(error);
    }
});

router.get('/', async (request, response, next) => {

    try {
        const result = await Income.find({user:request.user.id})
        .populate('user', 'name').populate('account', 'name icon').populate('category', 'name icon');
        return response.json(result);
    }
    catch(error) {
        next(error);
    }

});

router.get('/:id', async (request, response, next) => {
    try {
        const income = await Income.findById(request.params.id)
        .populate('user', 'name').populate('account', 'name icon').populate('category', 'name icon');

        if(!income)
            return response.status(400).json(responses.dataDoesNotExist('income'));

        if(income.user.id.toString() === request.user.id ||request.user.admin) {
            return response.json(income);
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
        const body = request.body;
        const account = await Account.findById(body.account);
        const category = await Category.findById(body.category);
        let type = 'need';

        if(body.type && body.type !== null && body.type !== undefined)
            type = body.type;

        if(!account||!category ||!body.date) 
            return response.status(400).json(responses.fieldsDoNotExist('date, account and category'));
        

        if(category.type !== 'income')
            response.status(400).json(responses.invalidType('category'));

        if(account.user.toString() !== request.user.id
        ||category.user.toString() !== request.user.id) {
            return response.status(400).json(responses.dataDoesNotExist('new user info'));
        }

        const income = new Income({
            amount: Math.abs(body.amount),
            description: body.description,
            user:request.user.id,
            account:body.account,
            category: body.category,
            date:body.date,
            type
        });

        account.balance += income.amount;

        await income.save();
        await account.save();

        const result = await Income.findById(income.id.toString())
        .populate('user', 'name').populate('account', 'name icon').populate('category', 'name icon');

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
        const income = await Income.findById(request.params.id);

        if(!income) {
            return response.status(400).json(responses.dataDoesNotExist('income'));
        }
        
        if(income.user.toString() === request.user.id || request.user.admin) {
            const result = await Income.findByIdAndUpdate(request.params.id, update, {new: true})
            .populate('user', 'name').populate('account', 'name icon').populate('category', 'type name icon');
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
        const income = await Income.findById(request.params.id);

        if(!income)
            return response.status(400).json(responses.dataDoesNotExist('income'));
        
        if(request.user.admin || request.user.id === income.user.toString()) {
            await income.remove();
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