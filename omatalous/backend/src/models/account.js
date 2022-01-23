const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        default: 'default',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    balance: {
        type: Number,
        required: true,
        default: 0
    },
    avatar: {
        type: String,
        required: false
    }
}, {
    timestamps:true
});

accountSchema.set('toJSON', {

    transform: (document, returnedObject) => {

        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;

    }

});

module.exports = mongoose.model('Account', accountSchema);