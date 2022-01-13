const Category = require('../models/category');
const Account = require('../models/account');
const PaymentMethod = require('../models/paymentMethod');
let user = '';

const addDefaultsToUser = async (userId) => {
    user = userId;

    const defaultAccount = new Account({
        name: 'Default account',
        icon: 'default',
        user: userId
    });

    await defaultAccount.save();

    await addPaymentMethod('Debit card', defaultAccount.id.toString());
    await addPaymentMethod('Credit card', defaultAccount.id.toString());
    await addPaymentMethod('Cash', defaultAccount.id.toString());
    await addPaymentMethod('Bank transfer', defaultAccount.id.toString());

    await addCategory('Rent');
    await addCategory('Software Subscriptions');
    await addCategory('Groceries');
    await addCategory('Cell Service');
    await addCategory('Internet');
    await addCategory('Transport');
    await addCategory('Household supplies');
    await addCategory('Medication');
    await addCategory('Cosmetics');
    await addCategory('Clothing');
    await addCategory('Banking');
    await addCategory('Computer and electronics');
    await addCategory('Giving');
    await addCategory('Education');
    await addCategory('Fitness');
    await addCategory('Events');
    await addCategory('Dining out');
    await addCategory('Music');
    await addCategory('Other');
};

const addPaymentMethod = async (name, account) => {
    const paymentMethod = new PaymentMethod({
        name,
        icon: 'default',
        user,
        account
    });

    await paymentMethod.save();
};

const addCategory = async (name) => {
    const category = new Category({
        name,
        icon: 'default',
        user
    });

    await category.save();
};
 
module.exports = addDefaultsToUser;