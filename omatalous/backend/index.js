const app = require('./src/app');
const http = require('http');
const { PORT } = require('./src/utils/config');

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
});