const mongoose = require('mongoose')

const TransactionsSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Please add some text']
    },
    description: {
        type: String,
        required: [true, 'Please add a positive or negative number']
    },
    activity: {
        type: String
        // required: [true, 'Please add a positive or negative number']
    },
    duration: {
        type: Number,
        required: [true, 'Please add a positive or negative number']
    },
     date: {
        type: Date,
        required: [true, 'Please add a positive or negative number']
    },
    // createdAt: {
    //     type: Date,
    //     default: Date.now
    // }
})

module.exports = mongoose.model('transactions', TransactionsSchema)