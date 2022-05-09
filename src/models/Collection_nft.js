const { Schema, model } = require('mongoose');

const Collection_nft = Schema({
    name: {
        type: String,  
    },
    image: { //? cloudinary
        type: String
    },
    description: {
        type: String
    },
});
Collection_nft.method('toJSON', function () {
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('Collection_nft', Collection_nft);