// This config file takes variables from environmental values (check .env for example) and sets them for easy-access
// These environmental values defined by process.env MUST BE set for this application to work.

require('dotenv').config();

const PORT = process.env.PORT || 3001;
const WEBTOKEN_SECRET = process.env.WEBTOKEN_SECRET;
const TOKEN_DEFAULT_EXPIRATION = 86400000;  // milliseconds, this is 24h
const PASSWORD_RESET_TOKEN_EXPIRATION = 1800000; // 30 minutes

const URI = process.env.NODE_ENV === 'test'
    ? process.env.URI_TEST
    :  process.env.URI;

const NODEMAILER_USERNAME= process.env.NODEMAILER_USERNAME;
const NODEMAILER_PASSWORD= process.env.NODEMAILER_PASSWORD;
const FRONTEND_HOST = process.env.FRONTEND_HOST; // http://localhost:3000

module.exports = {
    PORT,
    URI,
    WEBTOKEN_SECRET,
    TOKEN_DEFAULT_EXPIRATION,
    NODEMAILER_USERNAME,
    NODEMAILER_PASSWORD,
    FRONTEND_HOST
};
