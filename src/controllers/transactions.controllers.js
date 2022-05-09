const Transactions = require('../models/Transactions');

const getAllTransactions = async (req, res) => {
    try {
        const getTrans = await Transactions.find()
            .populate("userId", {_id:1}) 
            .populate("usename", {username:1, _id:0})
            .populate("nftId", {_id:1})
            .populate("namenft", {name:1, _id:0})
            .populate("currencies", {name:1, _id:0})


        res.status(200).json(getTrans);
    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: "Transactions not Found"
        });
        console.log(error);
    }

};

const getTransByNftName = async (req, res) => {
    const { name } = req.query;
    try {

    } catch (error) {

    }

};

const createTransaction = async (req, res) => {
    try {
        const newTransaction = new Transactions(req.body);
        await newTransaction.save();
        res.status(200).json({
            ok: true,
            msg: 'Transaction created',
            newCategory
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Transaction could not be created"
        });
        console.log(error);
    };
};

module.exports = { getAllTransactions, createTransaction };