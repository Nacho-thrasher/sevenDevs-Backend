const { Schema, model } = require('mongoose');

const Posting = Schema({
    posts : {
        type: String
    },
    username: {
        type: Schema.Types.ObjectId,
        ref: 'User'  
    },
    namenft: {
        type: Schema.Types.ObjectId,
        ref: 'Nft'
    }
});
Posting.method('toJSON', function () {
    const { __v, ...object } = this.toObject();
    return object;
});


module.exports = model('Posting', Posting);