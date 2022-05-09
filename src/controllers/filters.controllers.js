const Nft = require ('../models/Nft');

const getNftByCategory = async(req, res) => {
    const {id} = req.params;
    catId = {"category": id};
    try {
        const getByCategory = await Nft.find(catId)
            .populate('category', { name:1, _id:0})
            .populate('collection_nft', { name:1, _id:0})
            .populate('currencies', { name:1, _id:0})
            .populate('sales_types', { name:1, _id:0})
            .populate('files_types', { name:1, _id:0})
            .populate('details.owner', { username:1, _id:0})
            .populate('details.user_creator', { username:1, _id:0})
        res.status(200).json( getByCategory );   
    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: "Category not Found"
        });
        console.log(error);
    };
};

const getNftByOwner = async(req, res) => {
    const {id} = req.params;
    catId = {"details.owner": id};
    try {
        const getByOwner = await Nft.find(catId)
            .populate('category', { name:1, _id:0})
            .populate('collection_nft', { name:1, _id:0})
            .populate('currencies', { name:1, _id:0})
            .populate('sales_types', { name:1, _id:0})
            .populate('files_types', { name:1, _id:0})
            .populate('details.owner', { username:1, _id:0})
            .populate('details.user_creator', { username:1, _id:0})
        res.status(200).json( getByOwner );   
    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: "Owner not Found"
        });
        console.log(error);
    };
};

const getNftByCurrencies = async(req, res) => {
    const {id} = req.params;
    catId = {"currencies": id};
    try {
        const getByCurrencies = await Nft.find(catId)
            .populate('category', { name:1, _id:0})
            .populate('collection_nft', { name:1, _id:0})
            .populate('currencies', { name:1, _id:0})
            .populate('sales_types', { name:1, _id:0})
            .populate('files_types', { name:1, _id:0})
            .populate('details.owner', { username:1, _id:0})
            .populate('details.user_creator', { username:1, _id:0})
        res.status(200).json( getByCurrencies );   
    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: "Currency not Found"
        });
        console.log(error);
    };
};

const getNftBySalesTypes = async(req, res) => {
    const {id} = req.params;
    const catId = {"sales_types": id};
    try {
        const getBySalesTypes = await Nft.find(catId)
            .populate('category', { name:1, _id:0})
            .populate('collection_nft', { name:1, _id:0})
            .populate('currencies', { name:1, _id:0})
            .populate('sales_types', { name:1, _id:0})
            .populate('files_types', { name:1, _id:0})
            .populate('details.owner', { username:1, _id:0})
            .populate('details.user_creator', { username:1, _id:0})
        res.status(200).json( getBySalesTypes );   
    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: "Sales Type not Found"
        });
        console.log(error);
    };
};

const getNftByFilesTypes = async(req, res) => {
    const {id} = req.params;
    catId = {"files_types": id};
    try {
        const getByFilesTypes = await Nft.find(catId)
            .populate('category', { name:1, _id:0})
            .populate('collection_nft', { name:1, _id:0})
            .populate('currencies', { name:1, _id:0})
            .populate('sales_types', { name:1, _id:0})
            .populate('files_types', { name:1, _id:0})
            .populate('details.owner', { username:1, _id:0})
            .populate('details.user_creator', { username:1, _id:0})
        res.status(200).json( getByFilesTypes );   
    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: "Files Type not Found"
        });
        console.log(error);
    };
};

const getNftByUserCreator = async(req, res) => {
    const {id} = req.params;
    catId = {"details.user_creator": id};
    try {
        const getByCreator = await Nft.find(catId)
            .populate('category', { name:1, _id:0})
            .populate('collection_nft', { name:1, _id:0})
            .populate('currencies', { name:1, _id:0})
            .populate('sales_types', { name:1, _id:0})
            .populate('files_types', { name:1, _id:0})
            .populate('details.owner', { username:1, _id:0})
            .populate('details.user_creator', { username:1, _id:0})
        res.status(200).json( getByCreator );   
    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: "User Creator not Found"
        });
        console.log(error);
    };
};




module.exports = { getNftByCategory, getNftByOwner, getNftByCurrencies, getNftBySalesTypes, 
                   getNftByFilesTypes, getNftByUserCreator };
