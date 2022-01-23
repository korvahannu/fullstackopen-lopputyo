const router = require('express').Router();
const Income = require('../models/income');
const Outcome = require('../models/outcome');
const Account = require('../models/account');

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

    const accounts = await Account.find({user:user});

    for (const account of accounts) {
        account.balance = 0;

        const incomes = await Income.find({account:account.id.toString()});

        for(const income of incomes) {
            account.balance += income.amount;
        }

        const outcomes = await Outcome.find({account:account.id.toString()});

        for(const outcome of outcomes) {
            account.balance -= outcome.amount;
        }

        await account.save();
    }
};


module.exports = router;