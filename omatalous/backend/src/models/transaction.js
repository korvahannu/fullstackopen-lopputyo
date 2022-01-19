const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    description: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Account',
        required: true
    },
    paymentMethod: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PaymentMethod',
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    type: {
        required: true,
        type: String,
        enum: ['need', 'want'],
        default: 'need'
    },
}, {
    timestamps:true
});

transactionSchema.set('toJSON', {

    transform: (document, returnedObject) => {

        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;

    }

});

module.exports = mongoose.model('Transaction', transactionSchema);