const router = require('express').Router();
const Category = require('../models/category');
const { validateAdminAccount } = require('../middlewares/checkTokenAuthorization');

/*
Admin:
- full access to all categories
- Can delete specific category of a user
- Can edit any category of any user

User:
- view own categories
- view specific categories that they own
- delete own caregories
- edit own categories
*/

router.post('/', async (request, response, next) => {

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


router.get('/all/', validateAdminAccount, async (request, response, next) => {

    try {
        const result = await Category.find({});

        return response.json(result);
    }
    catch (error) {
        next(error);
    }

});


router.get('/', async (request, response, next) => {
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


router.get('/:id', async (request, response, next) => {
    const id = request.params.id;

    try {
        const category = await Category.findById(id);

        if(category === null || category === undefined)
            return response.status(400).json({error:'category does not exist'});

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

router.delete('/:id', async (request, response, next) => {
    const id = request.params.id;

    try {
        const category = await Category.findById(id);

        if(category === null || category === undefined)
            return response.status(400).json({error:'category does not exist'});

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

router.put('/:id', async (request, response, next) => {

    const body = request.body;

    let updatedCategory = {};

    if(body.name !== undefined)
        updatedCategory.name = body.name;
    
    if (body.icon !== undefined)
        updatedCategory.icon = body.icon;

    try {
        const category = await Category.findById(request.params.id);

        if(category === null || category === undefined)
            return response.status(400).json({error:'category does not exist'});

        if(category.user.toString() === request.user.id || request.user.admin) {
            const result = await Category.findByIdAndUpdate(request.params.id, updatedCategory, {new: true});
            return response.json(result);
        }
        else {
            return response.status(401).json({error: 'unauthorized'});
        }
    }
    catch(error) {
        next(error);
    }
});


module.exports = router;