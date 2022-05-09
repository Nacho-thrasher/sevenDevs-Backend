const Auction = require("../models/Auction");
const Offer = require("../models/Offers");

//@ cuando creo una acution buyer y amount deberian
//@ estar vacias hasta q se haga una oferta
//? en auction es setear la oferta mas actual
//? entonces traigo auction para hacer un seteo ahi
const createOffer = async (req, res) => {

    try {
        //? recibo uid user
        const uid = req.uid;
        //? recibo id nft 
        const { id } = req.params;
        //? traer auction por idNft y no por id de auction para que no se muestre el auction que esta en proceso
        const getAuction = await Auction.findOne({ idNft: id });
        //? si no hay auction en proceso
        if (!getAuction) {
            return res.status(404).json({
                ok: false,
                msg: "Auction not Found"
            });
        }
        //* todo bien, hay auction en proceso
        //? recibo body y armo un objeto
        const obj = {
            idNft: id,
            idUser: uid,
            create_date: new Date().toLocaleString(),
            ...req.body //? amount, currency, type
        }
        //? creo la oferta
        const newOffer = new Offer(obj);
        //? guardo la oferta
        await newOffer.save();
        //? traer la oferta por id 
        const getOffer = await Offer.findById(newOffer._id)
            .populate("idNft", { name: 1, _id: 0 })
            .populate("idUser", { username: 1, _id: 0 })
            .populate("currency", { name: 1, image: 1, _id: 0 })
        //? seteo en auction buyer y amount
        await Auction.findByIdAndUpdate(getAuction._id, {
            buyer: uid,
            amount: req.body.amount
        } , { new: true });
        //? traer auction actualizada
        const getAuctionUpdated = await Auction.findById(getAuction._id)
        .populate("ownerNft", {username:1, _id:0})
        .populate("namenft", {name:1, _id:0})
        .populate("buyer", {username:1, _id:0})
        //? retorno la oferta
        res.status(200).json({
            ok: true,
            msg: 'New Offer created',
            getOffer,
            getAuctionUpdated
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error in create Offer"
        });
    }
}

const getOffers = async (req, res) => {
    try {
        const { id } = req.params;

        //? traer auction por idNft
        const getAuction = await Auction.findOne({ idNft: id })
        .populate("ownerNft", {username:1, _id:0})
        .populate("namenft", {name:1, _id:0})
        .populate("buyer", {username:1, _id:0})
        if(!getAuction){
            return res.status(404).json({
                ok: false,
                msg: "Auction not Found"
            })
        }
        //? devolver todas las ofertas
        const offers = await Offer.find({ idNft: id })
        .populate("idNft", { name: 1, _id: 1 })
        .populate("idUser", { username: 1, _id: 0 })
        .populate("currency", { name: 1, image: 1, _id: 0 });

        res.status(200).json({
            ok: true,
            offers,
            getAuction
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error in get Offers"
        });
    }
}


module.exports = { createOffer, getOffers };