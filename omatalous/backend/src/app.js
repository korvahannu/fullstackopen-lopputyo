const { URI } = require('./utils/config');
const { log } = require('./utils/logger');

// EXTERNAL DEPENDENCIES
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

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
const outcomesRouter = require ('./routers/outcomes');
const incomesRouter = require ('./routers/incomes');
const logsRouter = require('./routers/logs');
const transactionsRouter = require('./routers/transactions');
const errorHandler = require('./middlewares/errorHandler');
const { checkTokenAuthorization, } = require('./middlewares/checkTokenAuthorization');
const forgotPasswordRouter = require('./routers/forgotPassword');

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
app.use('/api/forgot', forgotPasswordRouter);

// app.use(checkTokenAuthorization); // Routers after this middleware can only be used with a valid token

app.use('/api/user', checkTokenAuthorization, userRouter);
app.use('/api/users', checkTokenAuthorization, usersRouter);
app.use('/api/categories', checkTokenAuthorization, categoriesRouter);
app.use('/api/accounts', checkTokenAuthorization, accountsRouter);
app.use('/api/paymentmethods', checkTokenAuthorization, paymentMethodsRouter);
app.use('/api/outcomes', checkTokenAuthorization, outcomesRouter);
app.use('/api/incomes', checkTokenAuthorization, incomesRouter);
app.use('/api/transactions', checkTokenAuthorization, transactionsRouter);
app.use('/api/logs', checkTokenAuthorization, logsRouter);
app.use('/api/logout', checkTokenAuthorization, logoutRouter);

app.get('*', function(req, res) {
  console.log(path.join(__dirname, '../build/'));
  res.sendFile('index.html', {root: path.join(__dirname, '../build/')});
});

// POST-ROUTERS MIDDLEWARES
app.use(errorHandler);

module.exports = app;
