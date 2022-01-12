const router = require('express').Router();
const Log = require('../models/log');
const { validateAdminAccount } = require('../middlewares/checkTokenAuthorization');

router.get('/', async (request, response, next) => {
    try {
        const result = await Log.find({user: request.user.id});
        return response.json(result);
    }
    catch(error) {
        next(error);
    }
});

router.get('/all/', validateAdminAccount, async (request, response, next) => {
    try {
        const result = await Log.find({});
        return response.json(result);
    }
    catch(error) {
        next(error);
    }
});

module.exports = router;