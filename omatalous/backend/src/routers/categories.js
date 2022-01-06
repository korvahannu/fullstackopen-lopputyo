const router = require('express').Router();
const Category = require('../models/category');
const { checkTokenAuthorization, validateAdminAccount } = require('../middlewares/checkTokenAuthorization');

/*
Admin:
- full access to all categories
- Can delete specific category of a user

User:
- view own categories
- view specific categories that they own
- delete own caregories
*/

router.post('/', checkTokenAuthorization, async (request, response, next) => {

    try {
        
        const body = request.body;

        let icon = 'default';

        if(body.icon !== null && body.icon !== undefined)
            icon = body.icon;

        const category = new Category({
            name: body.name,
            icon,
            user: request.user.id
        });

        await category.save();

        return response.json(category);

    }
    catch (error) {
        next(error);
    }

});


router.get('/all/', checkTokenAuthorization, validateAdminAccount, async (request, response, next) => {

    try {
        const result = await Category.find({});

        return response.json(result);
    }
    catch (error) {
        next(error);
    }

});


router.get('/', checkTokenAuthorization, async (request, response, next) => {
    const userId = request.user.id;

    try {
        const result = await Category.find({
            user:userId
        });

        return response.json(result);
    }
    catch (error) {
        next(error);
    }
});


router.get('/:id', checkTokenAuthorization, async (request, response, next) => {
    const id = request.params.id;

    try {
        const category = await Category.findById(id);

        if(request.user.admin || category.user.toString() === request.user.id) {
            return response.json(category);
        }
        else {
            return response.status(401).json({error:'unauthorized'});
        }
    }
    catch(error) {
        next(error);
    }
});

router.delete('/:id', checkTokenAuthorization, async (request, response, next) => {
    const id = request.params.id;

    try {
        const category = await Category.findById(id);

        if(request.user.admin || category.user.toString() === request.user.id) {
            await category.remove();
            return response.status(200).end();
        }
        else {
            return response.status(401).json({error:'unauthorized'});
        }
    }
    catch(error) {
        next(error);
    }
});


module.exports = router;