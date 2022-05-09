const Auction = require("../models/Auction");


const getAllAuction = async (req, res) => {
    try {
        const getAuction = await Auction.find()
            .populate("ownerNft", {username:1, _id:0}) 
            .populate("namenft", {name:1, _id:0})
            .populate("buyer", {username:1, _id:0})
        res.status(200).json(getAuction);
    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: "Auction not Found"
        });
        console.log(error);
    };
};

const getAuctionByNftId = async (req, res) => {
    const { id } = req.params;
    const auctionId = {"idNft": id};
    try {
        
        //? encontrar por idNft y no por id de auction para que no se muestre el auction que esta en proceso
        const getAuction = await Auction.findOne(auctionId)
        .populate("ownerNft", {username:1, _id:0})
        .populate("namenft", {name:1, _id:0})
        .populate("buyer", {username:1, _id:0})
    
        //? si no hay auction en proceso
        if(!getAuction){
            return res.status(404).json({
                ok: false,
                msg: "Auction not Found"
            });
        }
        return res.status(200).json(getAuction);

    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: "Id not Found"
        });
        console.log(error);
    };
};

const createNewAuction = async (req, res) => {
    try {
        const newAuction = new Auction(req.body);
        await newAuction.save();
        res.status(200).json({
            ok: true,
            msg: 'New Auction created',
            newAuction
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "New Auction could not be create"
        });
        console.log(error);
    };
};

const deleteAuction = async (req, res) => {
    const { id } = req.params;
    try {
        const delAuction = await Auction.findByIdAndDelete(id);
        res.status(200).json({
            ok: true,
            msg: "Auction deleted",
            delAuction
        });
    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: "Auction could not be deleted"
        });
        console.log(error);
    };
};

module.exports = { getAllAuction, createNewAuction, deleteAuction, getAuctionByNftId };
