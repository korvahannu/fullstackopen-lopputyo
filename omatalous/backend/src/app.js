const { URI } = require('./utils/config');
const { log } = require('./utils/logger');

// EXTERNAL DEPENDENCIES
const mongoose = require('mongoose');
const express = require('express');
const app = express();

// IMPORT IN-HOUSE COMPONENTS
const getTokenFromRequest = require('./middlewares/getTokenFromRequest');
const usersRouter = require('./routers/users');
const loginRouter = require('./routers/login');
const categoriesRouter = require('./routers/categories');
const accountsRouter = require('./routers/accounts');
const paymentMethodsRouter = require('./routers/paymentMethods');
const userRouter = require('./routers/user');
const transactionsRouter = require ('./routers/transactions');
const errorHandler = require('./middlewares/errorHandler');

// ESTABLISH  CONNECTION TO MONGODB
const connectToMongo = async () => {
    log('Connecting to MongoDB...');
    await mongoose.connect(URI);
    log('...successfully connected to MongoDB!');
};

connectToMongo();

// PRE-ROUTERS MIDDLEWARES
app.use(express.static('build'));
app.use(express.json());
app.use(getTokenFromRequest);

// ROUTERS
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/accounts', accountsRouter);
app.use('/api/paymentmethods', paymentMethodsRouter);
app.use('/api/user', userRouter);
app.use('/api/transactions', transactionsRouter);


// PING ROUTE
app.use('/ping', (request, response) => {
    response.send('pong');
});

// POST-ROUTERS MIDDLEWARES
app.use(errorHandler);

module.exports = app;