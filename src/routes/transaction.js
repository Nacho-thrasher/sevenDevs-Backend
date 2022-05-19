const router = require('express').Router();
const { createTransaction, getAllTransactions, getTransByUserId, getTransByNftId  } = require('../controllers/transactions.controllers');

router.post('/', createTransaction );
router.get('/', getAllTransactions )
router.get('/:id', getTransByNftId )

module.exports = router;