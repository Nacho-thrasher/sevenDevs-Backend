const router = require('express').Router();
const { createNewAuction, getAllAuction, deleteAuction, getAuctionByNftId } = require("../controllers/auction.controllers");

router.post('/', createNewAuction);
router.get('/', getAllAuction);
router.delete('/', deleteAuction);
router.get('/:id', getAuctionByNftId);

module.exports = router;



