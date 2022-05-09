const router = require('express').Router();
const { orderNft } = require('../controllers/order.controllers');

router.get('/', orderNft);

module.exports = router;