const { Schema, model } = require('mongoose');

const Files_types = Schema({
    name: {
        type: String
    }

});
Files_types.method('toJSON', function () {
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('Files_types', Files_types);