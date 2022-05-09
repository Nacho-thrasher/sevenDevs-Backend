const { Schema, model } = require('mongoose');

const Currencies = Schema({
    name: {
        type: String
    },
    image: {
        type: String
    }
});
Currencies.method('toJSON', function () {
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('Currencies', Currencies);