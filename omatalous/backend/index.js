const { PORT, URI } = require('./src/utils/config');

const mongoose = require('mongoose');
const express = require('express');
const app = express();

const connectToMongo = async () => {
    console.log('Connecting to MongoDB...')
    await mongoose.connect(URI);
    console.log('...successfully connected to MongoDB!');
}

connectToMongo();

app.use(express.static('build'));
app.use(express.json());

app.get('/api/ping', async (request, response) => {
    response.send('pong');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(URI);
});