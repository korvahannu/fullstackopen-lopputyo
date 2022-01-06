require('dotenv').config();

const log = (message) => {
    if(process.env.NODE_ENV !== 'test')
        console.log(message);
};

module.exports =  { log };