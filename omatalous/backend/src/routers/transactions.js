const router = require('express').Router();
const Income = require('../models/income');
const Outcome = require('../models/outcome');
const Account = require('../models/account');
const PaymentMethod = require('../models/paymentMethod');
const Category = require('../models/category');
const responses = require('./responses');

// Return all incomes and outcomes of user sorted by date
router.get('/', async(request, response, next) => {
    try {
        const incomes = await Income.find({user:request.user.id})
        .populate('user', 'name').populate('account', 'name icon').populate('category', 'name icon type');

        const outcomes = await Outcome.find({user:request.user.id})
        .populate('user', 'name').populate('account', 'name icon').populate('paymentMethod', 'name icon').populate('category', 'name icon type');

        const result = [...incomes, ...outcomes];

        result.sort((a,b) => {
            let dateA = new Date(a.date);
            let dateB = new Date(b.date);

            if(dateA.toString() === dateB.toString()) {
                dateA = new Date(a.createdAt);
                dateB = new Date(b.createdAt);
            }

            return (dateB - dateA);
        });

        return response.json(result);
    } 
    catch(error) {
        next(error);
    }
});

// Get a list of id's to remove from incomes and outcomes

router.delete('/', async(request, response, next) => {
    // TODO: Removing any number of transactions causes all user accounts to be synced via syncAccounts
    // maybe pass an array of accounts instead of updating everything?
    try {

        const idArray = request.body.idArray;

        if(idArray === undefined ||idArray===null) {
            return response.status(400).end();
        }

        for (const id of idArray) {
            const outcome = await Outcome.findById(id);
            if(outcome !== null && outcome !== undefined && outcome.user.toString() === request.user.id) {
                await outcome.remove();
            }

            const income = await Income.findById(id);
            if(income !== null && income !== undefined && income.user.toString() === request.user.id) {
                await income.remove();
            }
        }

        await syncAccounts(request.user.id);

        return response.status(200).end();

    } 
    catch(error) {
        next(error);
    }
});

router.post('/syncBalances/', async(request, response, next) => {
    try {
        await syncAccounts(request.user.id);
        return response.status(200).end();
    } 
    catch(error) {
        next(error);
    }
});

const syncAccounts = async (user) => {
    console.log('syncing account balance');

    const accounts = await Account.find({user:user});

    for (const account of accounts) {
        account.balance = 0;

        const incomes = await Income.find({account:account.id.toString()});

        for(const income of incomes) {
            console.log('found income of ' + income.amount);
            account.balance += income.amount;
        }

        console.log('finished adding, balance ' + account.balance);

        const outcomes = await Outcome.find({account:account.id.toString()});

        for(const outcome of outcomes) {
            console.log('found outcome of ' + outcome.amount);
            account.balance -= outcome.amount;
        }
        
        console.log('final balance ' + account.balance);

        await account.save();
    }
};

router.put('/:id', async (request, response, next) => {
    const body = request.body;

    let update = {};

    if(!(check(body.type) && (body.type === 'income' || body.type === 'outcome')))
        return response.status(400).json({error:'Invalid transaction type'});

    if(check(body.amount))
        update.amount = body.amount;
    if(check(body.description))
        update.description = body.description;
    if(check(body.category)) {
        try {
            const _category = await Category.findById(body.category);

            if(_category && _category.user.toString() === request.user.id)
                update.category = body.category;
        }
        catch(error) {
            next(error);
        }
    }
    if(check(body.account)){
        try {
            const _account = await Account.findById(body.account);

            if(_account && _account.user.toString() === request.user.id) {
                update.account = body.account;
            }
        }
        catch(error) {
            next(error);
        }
    }
    if(body.type === 'outcome' && check(body.paymentMethod)){
        try {
            const _paymentMethod = await PaymentMethod.findById(body.paymentMethod);

            if(_paymentMethod && _paymentMethod.user.toString() === request.user.id)
                update.paymentMethod = body.paymentMethod;
        }
        catch(error) {
            next(error);
        }
    }
    if(check(body.date))
        update.date = body.date;
    
    if(body.type === 'income') {
        try {
            const income = await Income.findById(request.params.id);
    
            if(!income) {
                return response.status(400).json(responses.dataDoesNotExist('income'));
            }
            
            if(income.user.toString() === request.user.id) {
                const result = await Income.findByIdAndUpdate(request.params.id, update, {new: true})
                .populate('user', 'name').populate('account', 'name icon').populate('category', 'type name icon');
                await syncAccounts(request.user.id);
                return response.json(result);
            }
            else {
                return response.status(401).json(responses.notAuthorized());
            }
        }
        catch(error) {
            next(error);
        }
    }

    if(body.type === 'outcome') {
        try {
            const outcome = await Outcome.findById(request.params.id);
    
            if(!outcome) {
                return response.status(400).json(responses.dataDoesNotExist('outcome'));
            }
            
            if(outcome.user.toString() === request.user.id || request.user.admin) {
                const result = await Outcome.findByIdAndUpdate(request.params.id, update, {new: true})
                .populate('user', 'name').populate('account', 'name icon').populate('paymentMethod', 'name icon').populate('category', 'type name icon');
                await syncAccounts(request.user.id);
                return response.json(result);
            }
            else {
                return response.status(401).json(responses.notAuthorized());
            }
        }
        catch(error) {
            next(error);
        }
    }
});


const check = (val) => {
    return val !== undefined && val !== null;
};

module.exports = router;