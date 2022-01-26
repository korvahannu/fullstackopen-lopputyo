const router = require('express').Router();
const Account = require('../models/account');
const PaymentMethod = require('../models/paymentMethod');
const { validateAdminAccount } = require('../middlewares/checkTokenAuthorization');
const responses = require('./responses');

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

router.get('/all/', validateAdminAccount, async (request, response, next) => {

    try {
        const result = await Account.find({});
        return response.json(result);
    }
    catch (error) {
        next(error);
    }

});

router.get('/', async (request, response, next) => {

    const userId = request.user.id;

    try {
        const result = await Account.find({ user: userId });
        return response.json(result);
    }
    catch (error) {
        next(error);
    }

});

router.get('/:id', async (request, response, next) => {

    try {
        const account = await Account.findById(request.params.id);

        if (!account)
            return response.status(400).json(responses.dataDoesNotExist('account'));

        if (request.user.admin || request.user.id === account.user.toString()) {

            return response.json(account);
        }
        else {
            return response.status(401).json(responses.notAuthorized());
        }
    }
    catch (error) {
        next(error);
    }

});

router.post('/', async (request, response, next) => {
    try {

        const body = request.body;

        if (body.name === null || body.name === undefined || body.name === '')
            return response.status(400).json(responses.fieldMustBeDefined('Account name'));

        let icon = 'default';

        if (body.icon !== null && body.icon !== undefined)
            icon = body.icon;

        const account = new Account({
            name: body.name,
            icon,
            balance: body.balance,
            user: request.user.id
        });

        await account.save();   // Save account

        if (body.paymentMethods !== null && body.paymentMethods !== undefined) {
            const paymentMethods = body.paymentMethods;
            console.log(paymentMethods);

            for (const pm of paymentMethods) {

                if (pm.name === null || pm.name === undefined || pm.name === '')
                    continue;

                icon = 'default';
                if (pm.icon !== null && pm.icon !== undefined)
                    icon = pm.icon;

                const paymentMethod = new PaymentMethod({
                    name: pm.name,
                    icon,
                    user: request.user.id,
                    account: account.id.toString()
                });

                await paymentMethod.save();

            }
        }

        return response.json(account);

    }
    catch (error) {
        next(error);
    }
});

router.delete('/:id', async (request, response, next) => {

    try {
        const account = await Account.findById(request.params.id);

        if (!account)
            return response.status(400).json(responses.dataDoesNotExist('account'));

        if (request.user.admin || request.user.id === account.user.toString()) {
            await account.remove();
            return response.status(200).end();
        }
        else {
            return response.status(401).json(responses.notAuthorized());
        }
    }
    catch (error) {
        next(error);
    }

});

router.put('/:id', async (request, response, next) => {
    const body = request.body;

    let updatedAccount = {};

    if (body.name !== undefined)
        updatedAccount.name = body.name;

    if (body.icon !== undefined)
        updatedAccount.icon = body.icon;

    try {
        const account = await Account.findById(request.params.id);

        console.log(body);

        if (!account)
            return response.status(400).json(responses.dataDoesNotExist('account'));

        if (account.user.toString() === request.user.id || request.user.admin) {
            const result = await Account.findByIdAndUpdate(request.params.id, updatedAccount, { new: true });
            if (body.paymentMethods !== null && body.paymentMethods !== undefined) {
                if (body.paymentMethods.add !== null && body.paymentMethods.add.length > 0) {
                    for (const pm of body.paymentMethods.add) {
                        const paymentMethod = new PaymentMethod({
                            name: pm.name,
                            icon: pm.icon,
                            user: request.user.id,
                            account: request.params.id
                        });
                        await paymentMethod.save();
                    }
                }

                if (body.paymentMethods.delete !== null && body.paymentMethods.delete.length > 0) {
                    for (const pm of body.paymentMethods.delete) {

                        const paymentMethod = await PaymentMethod.findById(pm);
                        if (paymentMethod && request.user.id === paymentMethod.user.toString()) {
                            await paymentMethod.remove();
                        }

                    }
                }
            }
            return response.json(result);
        }
        else {
            return response.status(401).json(responses.notAuthorized());
        }
    }
    catch (error) {
        next(error);
    }
});

module.exports = router;