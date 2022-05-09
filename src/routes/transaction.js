const router = require('express').Router();
const {createTransaction} = require('../controllers/transactions.controllers');

router.post('/', createTransaction );


module.exports = router;