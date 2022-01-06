const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../src/app');
const api = supertest(app);
const User = require('../src/models/user');
const Category = require('../src/models/category');

const { createQuickUser } = require('./utils');

let token = '';
let helper;
let helperSecond;

const init = async () => {

    await User.deleteMany({});
    await Category.deleteMany({});

    const admin = await createQuickUser('admin', true);
    const adminUser = new User(admin);
    await adminUser.save();

    const normal = await createQuickUser('normal', false);
    const normalUser = new User(normal);

    await normalUser.save();

    const normalSecond = await createQuickUser('normalSecond', false);
    const normalSecondUser = new User(normalSecond);

    await normalSecondUser.save();

};

describe('Login tests', () => {

    test('Does logging in fail with wrong credentials?', async () => {

        await init();

        const credentials = {
            username: 'fail',
            password: 'fail'
        };

        await api.post('/api/login')
        .send(credentials)
        .expect(401)
        .expect('Content-Type', /application\/json/);

    });

    test('Can you log in and does logging in return token?', async () => {

        const credentials = {
            username: 'admin',
            password: 'admin'
        };

        const result = await api.post('/api/login')
        .send(credentials)
        .expect(200)
        .expect('Content-Type', /application\/json/);

        expect(result.body.token).not.toBeNull();
        expect(result.body.token).not.toBeUndefined();

        token = `bearer ${result.body.token}`;

    });

});

describe('User data access tests', () => {

    test('is a person without a token prevented access to any user info?', async () => {
        await api.get('/api/users')
        .expect(401)
        .expect('Content-Type', /application\/json/);
    });

    
    test('can admin access full list of users?', async () => {

        const result = await api.get('/api/users')
        .set('Authorization', token)
        .send()
        .expect(200)
        .expect('Content-Type', /application\/json/);

        expect(result.body)
        .toHaveLength(3);

        helper = result.body[1].id;
        helperSecond = result.body[2].id;

    });

    
    test('can admin access information of an user with a specific id?', async () => {

        const result = await api.get(`/api/users/${helper}`)
        .set('Authorization', token)
        .send()
        .expect(200)
        .expect('Content-Type', /application\/json/);

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

        await api.post('/api/users')
        .set('Authorization', token)
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/);

        const result2 = await api.get('/api/users')
        .set('Authorization', token)
        .send()
        .expect(200)
        .expect('Content-Type', /application\/json/);

        expect(result2.body)
        .toHaveLength(4);
    });

    test('is missing user info notified about?', async () => {

        const newUser = {
            name: 'hannu',
            admin: false
        };

        await api.post('/api/users')
        .set('Authorization', token)
        .send(newUser)
        .expect(400);
    });

    
    test('login as regular user', async () => {

        const credentials = {
            username: 'normal',
            password: 'normal'
        };

        const result = await api.post('/api/login')
        .send(credentials)
        .expect(200)
        .expect('Content-Type', /application\/json/);

        expect(result.body.token).not.toBeNull();
        expect(result.body.token).not.toBeUndefined();

        token = `bearer ${result.body.token}`;

    });

    test('is a regular user prevented from accessing full list of users?', async () => {

        await api.get('/api/users')
        .set('Authorization', token)
        .expect(401)
        .expect('Content-Type', /application\/json/);

    });

    test('is a regular user prevented from accessing another users information?', async () => {

        await api.get(`/api/users/${helperSecond}`)
        .set('Authorization', token)
        .send()
        .expect(401)
        .expect('Content-Type', /application\/json/);

    });

    test('Can a user view their own user information?', async () => {

        const result = await api.get(`/api/users/${helper}`)
        .set('Authorization', token)
        .send()
        .expect(200)
        .expect('Content-Type', /application\/json/);

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

        await api.post('/api/users')
        .set('Authorization', token)
        .send(newUser)
        .expect(401);
    });

});

describe('Category tests', () => {

    test('Can a regular user post a new category for themselves', async () => {

        const category = {
            name: 'my test category'
        };

        const result = await api.post('/api/categories/')
        .set('Authorization', token)
        .send(category)
        .expect(200)
        .expect('Content-Type', /application\/json/);

        helper = result.body.id;

    });

    test('Can user view only one of the categories by id?', async () => {

        const result = await api.get(`/api/categories/${helper}`)
        .set('Authorization', token)
        .send()
        .expect(200);

        expect(result.body.name).toBe('my test category');

    });

    test('Can user view all their categories?', async () => {
        const result = await api.get('/api/categories/')
        .set('Authorization', token)
        .send()
        .expect(200);

        expect(result.body)
        .toHaveLength(1);
    });

    test('Does wrong token prevent from viewing any categories?', async () => {
        await api.get('/api/categories/')
        .set('Authorization', 'fail token')
        .send()
        .expect(401);
    });

    test('Can user delete their own category?', async () => {
        const category = {
            name: 'my test category 2'
        };

        const result = await api.post('/api/categories/')
        .set('Authorization', token)
        .send(category)
        .expect(200)
        .expect('Content-Type', /application\/json/);
        
        await api.delete(`/api/categories/${result.body.id}`)
        .set('Authorization', token)
        .send()
        .expect(200);

        const result2 = await api.get('/api/categories/')
        .set('Authorization', token)
        .send()
        .expect(200);

        expect(result2.body)
        .toHaveLength(1);
    });

    test('Can admin view all categories by all users?', async () => {
        const credentials = {
            username: 'admin',
            password: 'admin'
        };

        const result = await api.post('/api/login')
        .send(credentials)
        .expect(200)
        .expect('Content-Type', /application\/json/);

        expect(result.body.token).not.toBeNull();
        expect(result.body.token).not.toBeUndefined();

        token = `bearer ${result.body.token}`;

        const result2 = await api.get('/api/categories/all/')
        .set('Authorization', token)
        .send()
        .expect(200)
        .expect('Content-Type', /application\/json/);

        expect(result2.body)
        .toHaveLength(1);
    });

    test('Can admin delete another users category?', async () => {

        await api.delete(`/api/categories/${helper}`)
        .set('Authorization', token)
        .send()
        .expect(200);
        
        const result2 = await api.get('/api/categories/all/')
        .set('Authorization', token)
        .send()
        .expect(200)
        .expect('Content-Type', /application\/json/);

        expect(result2.body)
        .toHaveLength(0);

    });

    test('You cant make a category with invalid information', async () => {
        const category = {
            test: 'should fail'
        };

        await api.post('/api/categories/')
        .set('Authorization', token)
        .send(category)
        .expect(400)
        .expect('Content-Type', /application\/json/);
    });

});

afterAll(()=> {
    mongoose.connection.close();
});