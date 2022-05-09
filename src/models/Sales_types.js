const { Schema, model } = require('mongoose');

const Sales_types = Schema({
    name: {
        type: String
    }
});
Sales_types.method('toJSON', function () {
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('Sales_types', Sales_types);