const { Schema, model } = require('mongoose');
var mongoose = require('mongoose')
require('mongoose-double')(mongoose);

const Transactions = Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    nftId: {
        type: Schema.Types.ObjectId,
        ref: 'Nft'
    },
    currencies: {
        type: Schema.Types.ObjectId,
        ref: 'Currencies'
    },
    amount: {
        type: mongoose.Types.Double
    },
    transaction_type: {
        type: Schema.Types.ObjectId,
        ref: 'Transaction_type'
    },
    create_date: {
        type: Date,
        default: Date.now
    },
});

Transactions.method('toJSON', function () {
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('Transactions', Transactions);