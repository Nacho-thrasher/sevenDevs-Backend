const router = require('express').Router();
const { createTransaction, getAllTransactions } = require('../controllers/transactions.controllers');

router.post('/', createTransaction );
router.get('/', getAllTransactions )

module.exports = router;