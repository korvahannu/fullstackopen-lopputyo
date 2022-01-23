const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        default: 'default'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    type: {
        required: true,
        type: String,
        enum: ['income', 'outcome'],
        default: 'outcome'
    }
}, {
    timestamps:true
});

categorySchema.set('toJSON', {

    transform: (document, returnedObject) => {

        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;

    }

});

module.exports = mongoose.model('Category', categorySchema);