const { URI } = require('./utils/config');
const { log } = require('./utils/logger');

// EXTERNAL DEPENDENCIES
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

// IMPORT IN-HOUSE COMPONENTS
const getTokenFromRequest = require('./middlewares/getTokenFromRequest');
const usersRouter = require('./routers/users');
const loginRouter = require('./routers/login');
const logoutRouter = require('./routers/logout');
const registerRouter = require('./routers/register');
const categoriesRouter = require('./routers/categories');
const accountsRouter = require('./routers/accounts');
const paymentMethodsRouter = require('./routers/paymentMethods');
const userRouter = require('./routers/user');
const transactionsRouter = require ('./routers/transactions');
const logsRouter = require('./routers/logs');
const errorHandler = require('./middlewares/errorHandler');
const { checkTokenAuthorization, } = require('./middlewares/checkTokenAuthorization');

// ESTABLISH  CONNECTION TO MONGODB
const connectToMongo = async () => {
    log('Connecting to MongoDB...');
    await mongoose.connect(URI);
    log('...successfully connected to MongoDB!');
};

connectToMongo();

// PRE-ROUTERS MIDDLEWARES
app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(morgan('dev'));
app.use(getTokenFromRequest);

// PING ROUTE
app.use('/ping', (request, response) => {
    response.send('pong');
});

// ROUTERS
app.use('/api/login', loginRouter);
app.use('/api/register', registerRouter);

app.use(checkTokenAuthorization); // Routers after this middleware can only be used with a valid token

app.use('/api/user', userRouter);
app.use('/api/users', usersRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/accounts', accountsRouter);
app.use('/api/paymentmethods', paymentMethodsRouter);
app.use('/api/transactions', transactionsRouter);
app.use('/api/logs', logsRouter);
app.use('/api/logout', logoutRouter);

// POST-ROUTERS MIDDLEWARES
app.use(errorHandler);

module.exports = app;