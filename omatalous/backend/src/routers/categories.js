const router = require('express').Router();
const Category = require('../models/category');
const { checkTokenAuthorization, validateAdminAccount } = require('../middlewares/checkTokenAuthorization');

/*
Admin:
- view full category list
- view a specific category

User:
- view category info that is is hown

TO DO:
- Admin and user can add categories
- User can get ALL their categories
*/

router.get('/', checkTokenAuthorization, validateAdminAccount, async (request, response, next) => {

    try {
        const result = await Category.find({});

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

        if(category.user !== request.user.id  && !request.user.admin) {
            return response.status(401).json({error: 'unauthorized'});
        }

        if(category) {
            return response.json(category);
        }
        else {
            return response.status(400).json({error: 'category with given id does not exist'});
        }
    }
    catch (error) {
        next(error);
    }

});


module.exports = router;