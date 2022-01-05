const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
    },
    admin: {
        type: Boolean,
    },
    passwordHash: {
        type: String,
        required: true
    }

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