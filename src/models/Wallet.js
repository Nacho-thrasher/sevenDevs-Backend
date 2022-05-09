const { Schema, model } = require('mongoose');
var mongoose = require('mongoose')
require('mongoose-double')(mongoose);


const Wallet = Schema({
    currency: { 
        bnb:{
            type: mongoose.Types.Double
        },
        usdt: {
            type: mongoose.Types.Double
        },
        eth: {
            type: mongoose.Types.Double
        } 
    },
    username: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

Wallet.method('toJSON', function () {
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('Wallet', Wallet);