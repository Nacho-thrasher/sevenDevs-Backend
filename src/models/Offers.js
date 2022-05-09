const { Schema, model } = require('mongoose');
var mongoose = require('mongoose')
require('mongoose-double')(mongoose);

//? modelo de ofertas
const Offer = Schema({
    idNft: {
        type: Schema.Types.ObjectId,
        ref: 'Nft'
    },
    //? setear el id del usuario que creo la oferta
    idUser: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    //? monto de la oferta
    amount: {
        type: mongoose.Types.Double
    },
    //? moneda de la oferta
    currency: {
        type: Schema.Types.ObjectId,
        ref: 'Currencies'
    },
    //? tipo de oferta
    // type: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Offer_types'
    // },
    //? estado de la oferta
    // status: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Offer_status'
    // },
    //? fecha de creacion de la oferta
    create_date: {
        type: String
    }

}, { collection: 'offers' });

module.exports = model('Offer', Offer);