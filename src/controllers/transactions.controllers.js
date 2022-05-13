const Transactions = require('../models/Transactions');

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

module.exports = { getAllTransactions, createTransaction };