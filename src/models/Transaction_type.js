const { Schema, model } = require('mongoose');

const Transaction_type = Schema({
    name: {
        type: String
    },
});

Transaction_type.method('toJSON', function () {
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('Transaction_type', Transaction_type);
