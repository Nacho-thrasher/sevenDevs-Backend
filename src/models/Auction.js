const { Schema, model } = require('mongoose');
var mongoose = require('mongoose')
require('mongoose-double')(mongoose);

const Auction = Schema({
    idNft: {
        type: Schema.Types.ObjectId,
        ref: 'Nft'
    },
    ownerNft: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    namenft: {
        type: Schema.Types.ObjectId,
        ref: 'Nft'
    },
    buyer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    amount: {
        type: mongoose.Types.Double
    },
    startDate: {
        type: String
    },
    finishDate: {
        type: String
    }

});

Auction.method('toJSON', function () {
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('Auction', Auction);