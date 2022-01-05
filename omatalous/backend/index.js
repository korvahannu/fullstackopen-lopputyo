const { PORT, URI } = require('./src/utils/config');

// EXTERNAL DEPENDENCIES
const mongoose = require('mongoose');
const express = require('express');
const app = express();

// IMPORT IN-HOUSE COMPONENTS
const getTokenFromRequest = require('./src/middlewares/getTokenFromRequest');
const usersRouter = require('./src/routers/users');
const loginRouter = require('./src/routers/login');
const errorHandler = require('./src/middlewares/errorHandler');

// ESTABLISH  CONNECTION TO MONGODB
const connectToMongo = async () => {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(URI);
    console.log('...successfully connected to MongoDB!');
};

connectToMongo();

// PRE-ROUTERS MIDDLEWARES
app.use(express.static('build'));
app.use(express.json());
app.use(getTokenFromRequest);

// ROUTERS
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

// POST-ROUTERS MIDDLEWARES
app.use(errorHandler);

// MAKE SERVER LISTEN TO PORT AS DEFINED IN ./src/utils/config.js
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});