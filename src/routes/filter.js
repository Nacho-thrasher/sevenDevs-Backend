const router = require('express').Router();
const { getNftByCategory, getNftByOwner, getNftByCurrencies, getNftBySalesTypes, 
        getNftByFilesTypes, getNftByUserCreator } = require('../controllers/filters.controllers');


router.get('/category/:id', getNftByCategory);
router.get('/owner/:id', getNftByOwner);
router.get('/currencies/:id', getNftByCurrencies);
router.get('/sales/:id', getNftBySalesTypes);
router.get('/files/:id', getNftByFilesTypes);
router.get('/creator/:id', getNftByUserCreator);

module.exports = router;