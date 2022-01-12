const router = require('express').Router();
const User = require('../models/user');
const { checkTokenAuthorization } = require('../middlewares/checkTokenAuthorization');

router.get('/', checkTokenAuthorization, async (request, response) => {
    return response.json(request.user);
});

router.post('/deleteAccount/', checkTokenAuthorization, async (request, response, next) => {
    if(request.user.admin) {
        return response.status(401).json({error: 'admins can not their own accounts, please contact system administrator'});
    }

    try {
        // Instead of deleting, we disable an account
        const user = await User.findByIdAndUpdate(request.user.id, {disabled: true}, {new: true});
        return response.json(user);
    }
    catch(error) {
        next(error);
    }
});

router.put('/updateAccount/', checkTokenAuthorization, async (request, response, next) => {
    // name, password

    const body = request.body;

    let updatedUser = {};

    if(body.name !== undefined)
        updatedUser.name = body.name;
    
    if (body.password !== undefined)
        updatedUser.password = body.password;

    try {
        const result = await User.findByIdAndUpdate(request.user.id, updatedUser, {new: true});
        return response.json(result);
    }
    catch(error) {
        next(error);
    }
});

module.exports = router;