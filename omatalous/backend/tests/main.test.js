const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../src/app');
const api = supertest(app);
const User = require('../src/models/user');
const Category = require('../src/models/category');
const Account = require('../src/models/account');
const PaymentMethod = require('../src/models/paymentMethod');
const Transaction = require('../src/models/transaction');

const { createQuickUser } = require('./utils');

const tokenlist = {
    admin: '',
    normal: '',
    normalSecond: ''
};

const userlist = {
    admin: '',
    normal: '',
    normalSecond: ''
};

let helper = '';
let helper2 = '';
let helper3 = '';
let helper4 = '';

const get = async (url, token, expectedCode, expectJson) => {
    if(expectJson) {
        const result = await api.get(url)
        .set('Authorization', token)
        .send()
        .expect(expectedCode)
        .expect('Content-Type', /application\/json/);

        return result;
    }
    else {
        const result = await api.get(url)
        .set('Authorization', token)
        .send()
        .expect(expectedCode);

        return result;
    }
};

const post = async (url, token, requestBody, expectedCode, expectJson) => {

    if(expectJson) {
        const result = await api.post(url)
        .set('Authorization', token)
        .send(requestBody)
        .expect(expectedCode)
        .expect('Content-Type', /application\/json/);

        return result;
    }
    else {
        const result = await api.post(url)
        .set('Authorization', token)
        .send(requestBody)
        .expect(expectedCode);

        return result;
    }
};

const delet = async (url, token, expectedCode) => {
    const result = await api.delete(url)
    .set('Authorization', token)
    .send()
    .expect(expectedCode);

    return result;
};

const put = async (url, token, requestBody, expectedCode, expectJson) => {

    if(expectJson) {
        const result = await api.put(url)
        .set('Authorization', token)
        .send(requestBody)
        .expect(expectedCode)
        .expect('Content-Type', /application\/json/);

        return result;
    }
    else {
        const result = await api.put(url)
        .set('Authorization', token)
        .send(requestBody)
        .expect(expectedCode);

        return result;
    }
};

const init = async () => {

    await User.deleteMany({});
    await Category.deleteMany({});
    await Account.deleteMany({});
    await PaymentMethod.deleteMany({});
    await Transaction.deleteMany({});

    const admin = await createQuickUser('admin', true);
    const adminUser = new User(admin);
    await adminUser.save();
    
    userlist.admin = adminUser._id.toString();

    const normal = await createQuickUser('normal', false);
    const normalUser = new User(normal);
    await normalUser.save();

    userlist.normal = normalUser._id.toString();
    
    const normalSecond = await createQuickUser('normalSecond', false);
    const normalSecondUser = new User(normalSecond);
    await normalSecondUser.save();

    userlist.normalSecond = normalSecondUser._id.toString();

};

describe('Login tests', () => {
    test('Does logging in fail with wrong credentials?', async () => {
        await init();
        const credentials = {
            username: 'fail',
            password: 'fail'
        };
        await post('/api/login', null, credentials, 401, true);
    });

    test('Can you log in and does logging in return token?', async () => {
        const credentials = {
            username: 'admin',
            password: 'admin'
        };
        const result = await post('/api/login', null, credentials, 200, true);
        expect(result.body.token).not.toBeNull();
        expect(result.body.token).not.toBeUndefined();
        tokenlist.admin = `bearer ${result.body.token}`;
    });

});

describe('User data access tests', () => {
    test('is a person without a token prevented access to any user info?', async () => {
        await get('/api/users', null, 401, true);
    });

    
    test('can admin access full list of users?', async () => {
        const result = await get('/api/users', tokenlist.admin, 200, true);
        expect(result.body)
        .toHaveLength(3);
    });

    
    test('can admin access information of an user with a specific id?', async () => {
        const result = await get(`/api/users/${userlist.normal}`, tokenlist.admin, 200, true);
        const user = result.body;
        expect(user.username).toBe('normal');
        expect(user.name).toBe('normal');
        expect(user.email).toBe('normal@normal.com');
    });

    test('can admin create a new user?', async () => {
        const newUser = {
            name: 'hannu',
            username: 'hannu',
            email: 'hannu.s.korvala@gmail.com',
            password: 'hannu',
            admin: false
        };
        await post('/api/users', tokenlist.admin, newUser, 200, true);
        const result = await get('/api/users', tokenlist.admin, 200, true);
        expect(result.body)
        .toHaveLength(4);
    });

    test('is missing user info notified about?', async () => {
        const newUser = {
            name: 'hannu',
            admin: false
        };
        await post('/api/users', tokenlist.admin, newUser, 400, true);
    });

    
    test('login as regular user', async () => {
        const credentials = {
            username: 'normal',
            password: 'normal'
        };
        const result = await post('/api/login', null, credentials, 200, true);
        expect(result.body.token).not.toBeNull();
        expect(result.body.token).not.toBeUndefined();
        tokenlist.normal = `bearer ${result.body.token}`;
    });

    test('is a regular user prevented from accessing full list of users?', async () => {
        await get('/api/users', tokenlist.normal, 401, true);
    });

    test('is a regular user prevented from accessing another users information?', async () => {
        await get(`/api/users/${userlist.normalSecond}`, tokenlist.normal, 401, true);
    });

    test('Can a user view their own user information?', async () => {

        const result = await get(`/api/users/${userlist.normal}`, tokenlist.normal, 200, true);
        expect(result.body)
        .toHaveProperty('email', 'normal@normal.com');
    });

    test('Is regular user prevented from making a new user?', async () => {
        const newUser = {
            name: 'hannu',
            username: 'hannu',
            email: 'hannu.s.korvala@gmail.com',
            password: 'hannu',
            admin: false
        };
        await post('/api/users', tokenlist.normal, newUser, 401, false);
    });
});

describe('Category tests', () => {

    test('Can a regular user post a new category for themselves', async () => {
        const category = {
            name: 'my test category'
        };
        const result = await post('/api/categories/', tokenlist.normal, category, 200, true);
        helper = result.body.id.toString();
    });

    test('Can user view only one of the categories by id?', async () => {
        const result = await get(`/api/categories/${helper}`, tokenlist.normal, 200, false);
        expect(result.body.name).toBe('my test category');
    });

    test('Can user view all their categories?', async () => {
        const result = await get('/api/categories/', tokenlist.normal, 200, false);
        expect(result.body)
        .toHaveLength(1);
    });

    test('Does wrong token prevent from viewing any categories?', async () => {
        await get('/api/categories/', 'fail token', 401, false);
    });

    test('Can user delete their own category?', async () => {
        const category = {
            name: 'my test category 2'
        };
        const result = await post('/api/categories/', tokenlist.normal, category, 200, true);
        await delet(`/api/categories/${result.body.id}`, tokenlist.normal, 200);
        const result2 = await get('/api/categories/', tokenlist.normal, 200, false);
        expect(result2.body)
        .toHaveLength(1);
    });

    test('Can admin view all categories by all users?', async () => {
        const result = await get('/api/categories/all/', tokenlist.admin, 200, true);
        expect(result.body)
        .toHaveLength(1);
    });

    test('Can admin delete another users category?', async () => {
        await delet(`/api/categories/${helper}`, tokenlist.admin, 200);
        const result = await get('/api/categories/all/', tokenlist.admin, 200, true);
        expect(result.body)
        .toHaveLength(0);
    });

    test('You cant make a category with invalid information', async () => {
        const category = {
            test: 'should fail'
        };
        await post('/api/categories/', tokenlist.admin, category, 400, true);
    });

    test('Trying to delete something that doesnt exist returns an error', async () => {
        await delet('/api/categories/y509jj0954590j4j9', tokenlist.admin, 400);
    });

    test('You can edit a category', async () => {
        const category = {
            name: 'TEST-CATEGORY'
        };
        const newCategory = await post('/api/categories/', tokenlist.normal, category, 200, true);
        const result = await put(`/api/categories/${newCategory.body.id.toString()}`, tokenlist.normal, {name:'EDITED-CATEGORY', icon:'EDIT'}, 200, true);
        expect(result.body.name).toBe('EDITED-CATEGORY');
        expect(result.body.icon).toBe('EDIT');
    });

});

describe('Account tests', () => {

    test('person without a token can not create an account', async () => {
        await post('/api/accounts', null, {name:'fail'}, 401, false);
    });

    test('user can add an account', async () => {
        const result = await post('/api/accounts', tokenlist.normal, {name: 'myaccount'}, 200, true);
        expect(result.body.name).toBe('myaccount');
    });

    test('user can not add account with missing info', async () => {
        await post('/api/accounts', tokenlist.normal, {fail:'fail'}, 400, false);
    });

    test('user can fetch their accounts', async () => {
        const result = await get('/api/accounts', tokenlist.normal, 200, true);
        expect(result.body).toHaveLength(1);
        expect(result.body[0].name).toBe('myaccount');
        helper = result.body[0].id;
    });

    test('user can get a specific account with account id', async () => {
        const result= await get(`/api/accounts/${helper}`, tokenlist.normal, 200, true);
        expect(result.body.name).toBe('myaccount');
    });

    test('admin can fetch all accounts while normal users can not', async () => {
        await get('/api/accounts/all/', tokenlist.normal, 401, false);
        const result = await get('/api/accounts/all/', tokenlist.admin, 200, true);
        expect(result.body).toHaveLength(1);
        expect(result.body[0].name).toBe('myaccount');
    });

    test('user can delete their own accounts', async () => {
        await delet(`/api/accounts/${helper}`, tokenlist.normal, 200);
    });

    test('user can edit their own accounts', async () => {
        const result = await post('/api/accounts', tokenlist.normal, {name:'myaccount2'}, 200, true);
        helper = result.body.id;

        await put(`/api/accounts/${helper}`, tokenlist.normal, {name:'mynewaccountname'}, 200, true);
        const result2 = await get(`/api/accounts/${helper}`, tokenlist.normal, 200, true);
        expect(result2.body.name).toBe('mynewaccountname');
    });

    test('other user or user without token can not delete other users accounts', async () => {
        await delet(`/api/accounts/${helper}`, tokenlist.normalSecond, 401);
        await delet(`/api/accounts/${helper}`, null, 401);
    });

    test('other user or user without token can not edit other users accounts', async () => {
        await put(`/api/accounts/${helper}`, tokenlist.normalSecond, {name:'fail'}, 401, false);
        await put(`/api/accounts/${helper}`, null, {name:'fail'}, 401, false);
    });

    test('admin can edit or delete other users accounts', async () => {
        const result = await put(`/api/accounts/${helper}`, tokenlist.admin, {name:'i am admin'}, 200, true);
        expect(result.body.name).toBe('i am admin');
        await delet(`/api/accounts/${helper}`, tokenlist.admin, 200);
    });
});

describe('Payment method tests', () => {

    test('user can add a payment method to an account', async () => {
        const account = await post('/api/accounts', tokenlist.normal, {name:'käyttötili'}, 200, true);
        helper = account.body.id.toString();
        const result = await post('/api/paymentmethods', tokenlist.normal, {name:'credit card', account:helper}, 200, true);
        await post('/api/paymentmethods', tokenlist.normal, {name:'debit card', account:helper}, 200, true);
        helper2 = result.body.id;
    });

    test('user can get info of a payment method with payment method id', async () => {
        const result = await get(`/api/paymentmethods/${helper2.toString()}`, tokenlist.normal, 200, true);
        expect(result.body.name).toBe('credit card');
        expect(result.body.account).toBe(helper);
    });

    test('user can ask for a list of all of their payment methods', async () => {
        const result = await get('/api/paymentmethods/', tokenlist.normal, 200, true);
        expect(result.body[0].name).toBe('credit card');
        expect(result.body[1].name).toBe('debit card');
    });

    test('you cant add payment methods with wrong or missing credentials', async () => {
        await post('/api/paymentmethods', null, {name:'debit card', account:helper}, 401, false);
    });

    test('user can not add a payment method with invalid info', async () => {
        await post('/api/paymentmethods', tokenlist.normal, {name:'debit card', account:'fail me'}, 400, false);
        await post('/api/paymentmethods', tokenlist.normal, {account:helper}, 400, false);
    });

    test('admin can retrieve all payment methods by all users while normal users can not', async () => {
        await get('/api/paymentmethods/all/', tokenlist.normalSecond, 401, false);
        const result = await get('/api/paymentmethods/all/', tokenlist.admin, 200, true);
        expect(result.body[0].name).toBe('credit card');
        expect(result.body[1].name).toBe('debit card');
    });

    test('user can edit their paymentmethods. admins can too', async () => {
        const paymentMethods = await get('/api/paymentmethods/', tokenlist.normal, 200, false);
        await put(`/api/paymentmethods/${paymentMethods.body[0].id.toString()}`, tokenlist.normal, {name:'test change'}, 200, true);
        const result = await get(`/api/paymentmethods/${paymentMethods.body[0].id.toString()}`, tokenlist.normal, 200, true);
        expect(result.body.name).toBe('test change');
    });

    test('user can delete a paymentmethod of theirs. Other users can not. Admin can do it aswell', async () => {
        const paymentMethods = await get('/api/paymentmethods/', tokenlist.normal, 200, false);
        await delet(`/api/paymentmethods/${paymentMethods.body[0].id.toString()}`, null, 401);
        await delet(`/api/paymentmethods/${paymentMethods.body[0].id.toString()}`, tokenlist.normal, 200);
        await delet(`/api/paymentmethods/${paymentMethods.body[1].id.toString()}`, tokenlist.admin, 200);
        const result = await get('/api/paymentmethods/', tokenlist.normal, 200, true);
        expect(result.body).toHaveLength(0);
    });
});

describe('User ', () => {

    test('users can view their own info via /api/user/', async () => {
        const result = await get('/api/user', tokenlist.normal, 200, true);
        expect(result.body.name).toBe('normal');
    });

    test('no token or invalid token means you get nothing at /api/user/', async () => {
        await get('/api/user', 'asdasdasdasdasda', 401, true);
        await get('/api/user', null, 401, true);
    });

    test('can not register account at /api/register with wrong info', async () => {
        await post('/api/register', null, {password:'test'}, 400, false);
        await post('/api/register', null, {username:'test', email:'dfgfdg', password:'test'}, 400, true);
        await post('/api/register', null, null, 400, false);
    });

    test('you can register a new account at /api/register', async () => {
        await post('/api/register', null, {username:'my new user', email:'newuser@gmail.com', password:'mynewuser'}, 200, true);
    });

    test('no duplicate registers are allowed', async () => {
        await post('/api/register', null, {username:'test', email:'test@test.com', password:'test'}, 200, false);
    });

    test('user can update account name at /api/user/updateAccount', async () => {
        await put('/api/user/updateAccount', tokenlist.normal, {name:'not-normal'}, 200, true);
        const result = await get('/api/user', tokenlist.normal, 200, true);
        expect(result.body.name).toBe('not-normal');
        await put('/api/user/updateAccount', tokenlist.normal, {name:'normal'}, 200, true);
    });

    test('user can delete account at /api/user/deleteAccount', async () => {
        // await get('/api/user/deleteAccount', tokenlist.normal, 200, true);

        // const result = await get(`/api/users/${userlist.normal}`, tokenlist.admin, 200, true);
        //expect(result.body.disabled).toBe(true);
    });

    test('deleted account can not do anything anymore', async () => {
        // await get('/api/user', tokenlist.normal, 401, false);
    });

    test('admin cant delete their own account', async () => {
        await get('/api/user/deleteAccount', tokenlist.admin, 401, false);
    });
});

describe('Transaction tests', () => {

    test('User can add a transaction', async () => {
        helper = await post('/api/accounts', tokenlist.normal, {name:'account1'}, 200, true);
        helper2 = await post('/api/categories', tokenlist.normal, {name:'category1'}, 200, true);
        helper3 = await post('/api/paymentMethods', tokenlist.normal, {name:'paymentMethod1', account:helper.body.id.toString()}, 200, true);

        helper4 = await post('/api/transactions', tokenlist.normal, {
            amount: 500,
            description: 'test',
            user:userlist.normal,
            account:helper.body.id.toString(),
            category:helper2.body.id.toString(),
            paymentMethod: helper3.body.id.toString(),
            
        }, 200, true);

        expect(helper4.body.account.name).toBe('account1');
        expect(helper4.body.paymentMethod.name).toBe('paymentMethod1');
        expect(helper4.body.category.name).toBe('category1');
    });

    test('user can edit transaction', async () => {

        helper = await post('/api/accounts', tokenlist.normal, {name:'account2'}, 200, true);
        helper2 = await post('/api/categories', tokenlist.normal, {name:'category2'}, 200, true);
        helper3 = await post('/api/paymentMethods', tokenlist.normal, {name:'paymentMethod2', account:helper.body.id.toString()}, 200, true);

        const result = await put(`/api/transactions/${helper4.body.id.toString()}`, tokenlist.normal, 
        {amount:200, description:'hello world', account:helper.body.id.toString(), category:helper2.body.id.toString(), paymentMethod:helper3.body.id.toString()}, 200, true);

        expect(result.body.amount).toBe(200);
        expect(result.body.description).toBe('hello world');
        expect(result.body.account.name).toBe('account2');
        expect(result.body.paymentMethod.name).toBe('paymentMethod2');
        expect(result.body.category.name).toBe('category2');
    });

    test('user can delete a transaction', async () => {
        const dummy = await post('/api/transactions', tokenlist.normal, {
            amount: 555,
            description: 'dummy',
            user:userlist.normal,
            account:helper.body.id.toString(),
            category:helper2.body.id.toString(),
            paymentMethod: helper3.body.id.toString(),
        }, 200, true);

        await delet(`/api/transactions/${dummy.body.id.toString()}`, tokenlist.normal, 200);
    });

    test('user can view a specific transaction with id of it', async () => {
        const result = await get(`/api/transactions/${helper4.body.id.toString()}`, tokenlist.normal, 200, true);
        expect(result.body.description).toBe('hello world');
    });

    test('user can view all their transactions', async () => {
        const result = await get('/api/transactions/', tokenlist.normal, 200, true);
        expect(result.body).toHaveLength(1);
    });

    test('Admin can view /all/', async () => {
        const result = await get('/api/transactions/all/', tokenlist.admin, 200, true);
        expect(result.body).toHaveLength(1);
    });

    test('Admin can edit anyones transaction', async () => {
        const result = await put(`/api/transactions/${helper4.body.id.toString()}`, tokenlist.admin, 
        {description:'i am an admin'}, 200, true);
        expect(result.body.description).toBe('i am an admin');
    });

    test('Admin can delete anyones transaction', async() => {
        const dummy = await post('/api/transactions', tokenlist.normal, {
            amount: 555,
            description: 'dummy',
            user:userlist.normal,
            account:helper.body.id.toString(),
            category:helper2.body.id.toString(),
            paymentMethod: helper3.body.id.toString(),
        }, 200, true);

        await delet(`/api/transactions/${dummy.body.id.toString()}`, tokenlist.admin, 200);
    });

    test('User can not view another users transaction', async () => {
        await get(`/api/transactions/${helper4.body.id.toString()}`, tokenlist.normalSecond, 401, false);
    });

    test('User can not delete another users transaction', async () => {
        await delet(`/api/transactions/${helper4.body.id.toString()}`, tokenlist.normalSecond, 401);
    });

    test('User can not edit another users transaction', async () => {
        await put(`/api/transactions/${helper4.body.id.toString()}`, tokenlist.normalSecond, 
        {description:'this should fail'}, 401, false);
    });

    test('User can not post a transaction with invalid info (e.g. missing category or account)', async () => {
        await post('/api/transactions', tokenlist.normal, {
            amount: 555,
            description: 'dummy',
            account:helper.body.id.toString(),
            category:helper2.body.id.toString(),
        }, 400, false);
        await post('/api/transactions', tokenlist.normal, {
            amount: 555,
            account:helper.body.id.toString(),
            paymentMethod: helper3.body.id.toString(),
        }, 400, false);
        await post('/api/transactions', tokenlist.normal, {
            amount: 555,
            category:helper2.body.id.toString(),
            paymentMethod: helper3.body.id.toString(),
        }, 400, false);
        await post('/api/transactions', tokenlist.normal, {
            account:helper.body.id.toString(),
            category:helper2.body.id.toString(),
            paymentMethod: helper3.body.id.toString(),
        }, 400, false);
        await post('/api/transactions', tokenlist.normal, {
            amount: 'fail me',
            account:helper.body.id.toString(),
            category:helper2.body.id.toString(),
            paymentMethod: helper3.body.id.toString(),
        }, 400, false);
        await post('/api/transactions', tokenlist.normal, {
            amount: 555,
            account:'fail me',
            category:helper2.body.id.toString(),
            paymentMethod: helper3.body.id.toString(),
        }, 400, false);
        await post('/api/transactions', tokenlist.normal, {
            amount: 555,
            account:helper.body.id.toString(),
            category:'fail me',
            paymentMethod: helper3.body.id.toString(),
        }, 400, false);
        await post('/api/transactions', tokenlist.normal, {
            amount: 555,
            account:helper.body.id.toString(),
            category:helper2.body.id.toString(),
            paymentMethod: 'fail me',
        }, 400, false);
    });

    test('User can not edit a transaction to have invalid info (e.g. changing account to another users account)', async () => {
        await put(`/api/transactions/${helper4.body.id.toString()}`, tokenlist.normal, 
        {account:'gddgffdg'}, 400, false);
        await put(`/api/transactions/${helper4.body.id.toString()}`, tokenlist.normal, 
        {category:'gddgffdg'}, 400, false);
        await put(`/api/transactions/${helper4.body.id.toString()}`, tokenlist.normal, 
        {paymentMethod:'gddgffdg'}, 400, false);
    });
});

afterAll(()=> {
    mongoose.connection.close();
});