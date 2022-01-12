const mongoose = require('mongoose');

/*
TODO:
Add router for logout
Add webtoken expiration, session control with redis possibly?

*/

const logSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    type: {
        required: true,
        type: String,
        enum: ['User action', 'Admin action', 'Notification', 'Warning', 'Error', 'Unknown']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

logSchema.set('toJSON', {

    transform: (document, returnedObject) => {

        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;

    }

});

module.exports = mongoose.model('Log', logSchema);