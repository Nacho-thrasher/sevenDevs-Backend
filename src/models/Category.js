const { Schema, model } = require('mongoose');

const mongoose = require('mongoose');

const Category = Schema({
    name: {
        type: String
    }
});
Category.method('toJSON', function () {
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('Category', Category);