const Transactions = require('../models/Transactions');
const Nft = require ('../models/Nft');

const getAllTransactions = async (req, res) => {
    try {
        const getTrans = await Transactions.find()
            .populate("userId", {_id:1, username:1}) 
            .populate("nftId", {_id:1, name: 1})
            .populate("currencies", {name:1, _id:1})
            .populate("transaction_type", 'name')

        res.status(200).json(getTrans);
    
    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: "Transactions not Found"
        });
        console.log(error);
    }

};

const createTransaction = async (req, res) => {
    try {
        const nftId = req.body.nftId;
        //? modificar sales_types nft id
        const sales_types = req.body.sales_types;
        await Nft.findByIdAndUpdate(nftId, {sales_types: sales_types});

        const newTransaction = new Transactions(req.body);
        await newTransaction.save();
        const getNewTransaction = await Transactions.findById(newTransaction._id)
        .populate("userId", 'username')
        .populate("nftId", 'name')
        .populate("currencies", 'name')
        .populate("transaction_type", 'name')

        res.status(200).json({
            ok: true,
            msg: 'Transaction created',
            transaction: getNewTransaction
        });
    

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Transaction could not be created"
        });
        console.log(error);
    };
};

const getTransByUserId = async (req, res) => {
    const {id} = req.params;
    getUserId = {"userId": id};
    try {
        const getTrans = await Transactions.find(getUserId)
            .populate("userId", {_id:1}) 
            .populate("nftId", {_id:1})
            .populate("currencies", {name:1, _id:0})
            .populate("transaction_type", {name:1, _id:0}) 
        res.status(200).json(getTrans);
    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: "Transaction by User id not Found"
        });
        console.log(error);
    };
};

const getTransByNftId = async (req, res) => {
    const {id} = req.params;
    getNftId = {"nftId": id};
    try {
        const getTrans = await Transactions.find(getNftId)
            .populate("userId", {_id:1, username:1 }) 
            .populate("nftId", {_id:1, name: 1, price:1})
            .populate("currencies", {name:1, _id:0})
            .populate("transaction_type", {name:1, _id:0}) 
        res.status(200).json(getTrans);      
    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: "Transaction by NFT id not Found"
        });
        console.log(error);
    };
};



module.exports = { getAllTransactions, createTransaction, getTransByUserId, getTransByNftId };