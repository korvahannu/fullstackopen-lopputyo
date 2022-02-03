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

module.exports.sendVerificationEmail = (name, email, verificationToken) => {
    transport.sendMail({
        from: user,
        to: email,
        subject: 'Your code for reseting password',
        html: `
            <div>
            <h1>Password reset</h1>
            <h2>Hello ${name}</h2>
            <p>We have recieved a request from you about reseting your password. If you did not
            want to reset your password, please ignore this email.</p>
            <p>Your password reset code is:</p>
            <h3>${verificationToken}</h3>
            </div>
        `
    })
    .catch(error => {
        console.log(error);
    });
};

module.exports.sendConfirmationEmail = (name, email, confirmationCode) => {
    console.log('Sending confirmation email with url');

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