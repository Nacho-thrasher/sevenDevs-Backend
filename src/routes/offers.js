const { Router } = require('express');
const router = Router();
const { createOffer, getOffers } = require('../controllers/offer.controllers')
const { validarJwt } = require('../middlewares/validarJwt.js');

router.post('/:id', validarJwt, createOffer);
router.get('/:id', getOffers);

module.exports = router;