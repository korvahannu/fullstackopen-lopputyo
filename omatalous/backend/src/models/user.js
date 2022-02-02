const mongoose = require('mongoose');

const validateEmail = (email) => {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // eslint-disable-line
    return re.test(email);
};

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        unique: true,
        required: true,
        minlength: 5
    },
    name: {
        type: String
    },
    status: {
        type: String,
        enum: ['Pending', 'Active'],
        default: 'Pending'
    },
    confirmationCode: {
        type: String,
        unique: true
    },
    admin: {
        type: Boolean,
        required: true,
        default: false
    },
    passwordHash: {
        type: String,
        required: true,
        minlength: 5
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique:true,
        validate: [validateEmail, 'Invalid email'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email'] // eslint-disable-line
    },
    disabled: {
        type: Boolean,
        required: true,
        default: false
    },
    avatar: {
        type: String,
        required: false
    }
}, {
    timestamps:true
});

userSchema.set('toJSON', {

    transform: (document, returnedObject) => {

        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.passwordHash; // We never want to return passwordHash per request

    }

});

module.exports = mongoose.model('User', userSchema);