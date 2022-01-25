const router = require('express').Router();
const PaymentMethod = require('../models/paymentMethod');
const Account = require('../models/account');
const { validateAdminAccount } = require('../middlewares/checkTokenAuthorization');
const responses = require('./responses');

/*
Admin:
- full access to all paymentmethods
- Can delete specific payment method of a user
- Can edit any payment method by any user

User:
- view own payment methods
- view specific payment methods that they own
- delete own payment methods
- edit own payment methods
*/

router.get('/', async (request, response, next) => {
    const userId = request.user.id;

    try {
        const result = await PaymentMethod.find({user: userId})
        .populate('account', 'name id');
        return response.json(result);
    }
    catch(error) {
        next(error);
    }
});

router.get('/all/', validateAdminAccount, async (request, response, next) => {
    try {

        const result = await PaymentMethod.find({});

        return response.json(result);

    }
    catch(error) {
        next(error);
    }
});

router.get('/:id', async (request, response, next) => {
    try {
        const result = await PaymentMethod.findById(request.params.id);

        if(!result)
            return response.status(400).json(responses.dataDoesNotExist('payment method'));

        if(request.user.admin || request.user.id === result.user.toString()) {
            return response.json(result);
        }
        else
            response.status(401).json(responses.notAuthorized());
    }
    catch(error) {
        next(error);
    }
});

router.post('/', async (request, response, next) => {

    try {

        const body = request.body;

        let icon = 'default';

        if(body.icon !== null && body.icon !== undefined)
            icon = body.icon;
        
        if(body.account == null || body.account === undefined)
            return response.json(400).json(responses.fieldMustBeDefined('account'));
        
        const account = await Account.findById(body.account);

        if(account.user.toString() !== request.user.id) {
            return response.json(400).json(responses.doesNotBelongToUser('account'));
        }

        if(!account) {
            return response.json(400).json(responses.dataDoesNotExist('account'));
        }

        const paymentMethod = new PaymentMethod({
            name: body.name,
            icon,
            user:request.user.id,
            account:body.account
        });

        await paymentMethod.save();

        return response.json(paymentMethod);
    }
    catch(error) {
        next(error);
    }

});

router.delete('/:id', async (request, response, next) => {
    try {
       const paymentMethod = await PaymentMethod.findById(request.params.id);

       if(!paymentMethod)
            return response.status(400).json(responses.dataDoesNotExist('payment method'));
       
       if(request.user.admin || request.user.id === paymentMethod.user.toString()) {
           await paymentMethod.remove();
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

router.put('/:id', async (request, response, next) => {

    const body = request.body;

    let updatedPaymentMethod = {};

    if(body.name !== undefined)
        updatedPaymentMethod.name = body.name;
    
    if (body.icon !== undefined)
        updatedPaymentMethod.icon = body.icon;

    try {
        const paymentMethod = await PaymentMethod.findById(request.params.id);

        if(!paymentMethod)
            return response.status(400).json(responses.dataDoesNotExist('payment method'));

        if(paymentMethod.user.toString() === request.user.id || request.user.admin) {
            const result = await PaymentMethod.findByIdAndUpdate(request.params.id, updatedPaymentMethod, {new: true});
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

module.exports = router;