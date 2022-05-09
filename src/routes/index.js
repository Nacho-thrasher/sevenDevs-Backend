const { Router } = require('express');

const usersRouter = require("../routes/users");
const authRouter = require("../routes/auth");
const nftRouter = require("../routes/nft");
const miscRouter = require('../routes/misc');
const filterRouter = require("../routes/filter");
const orderRouter = require("../routes/order");
const auctionRouter = require("../routes/auction");
const transactionRouter = require("../routes/transaction");
const offerRouter = require("../routes/offers");
const uploadFilesRouter = require("../routes/uploadFiles");

const router = Router();

router.use('/users', usersRouter);
router.use('/auth', authRouter);
router.use('/nft', nftRouter);
router.use('/misc', miscRouter);
router.use('/filter', filterRouter);
router.use('/order', orderRouter);
router.use('/auction', auctionRouter);
router.use('/trans', transactionRouter);
router.use('/offer', offerRouter)
router.use('/upload', uploadFilesRouter)

module.exports = router;

