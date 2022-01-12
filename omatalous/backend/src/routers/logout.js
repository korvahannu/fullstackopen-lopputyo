const router = require('express').Router();
const Session = require('../models/session');

router.post('/', async (request, response ,next) => {

    try {
        const session = await Session.findOne({user: request.user.id});
        await session.remove();
        return response.status(200).end();

    }
    catch(error) {
        next(error);
    }

});

module.exports = router;