const nodemailer = require('nodemailer');
const config = require('./config');

const user = config.NODEMAILER_USERNAME;
const password = config.NODEMAILER_PASSWORD;

const transport = nodemailer.createTransport({
   service: 'Gmail',
   auth: {
       user: user,
       pass: password
   } 
});

module.exports.sendConfirmationEmail = (name, email, url, confirmationCode) => {
    console.log('Sending confirmation email with url ' + url);

    transport.sendMail({
        from: user,
        to: email,
        subject: 'Please confirm your account',
        html: `
            <div>
            <h1>Email confirmation</h1>
            <h2>Hello ${name}</h2>
            <p>Thank you for registering for my application! Please confirm your email
            by clicking the following link <a href=${config.FRONTEND_HOST}/confirm/${confirmationCode}>here</a> </p>
            </div>
        `
    })
    .catch(error => {
        console.log(error);
    });
};