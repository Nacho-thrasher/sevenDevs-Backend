const { Router} = require ('express');
const router = Router();
const { getAllNfts, createNft, putNftUpdate, deleteNft, getNftById } = require ('../controllers/nft.controllers');
const { validarJwt } = require('../middlewares/validarJwt.js');

router.get('/', getAllNfts); /// Trae todos los NFT y name por query
router.post('/', validarJwt, createNft);
router.get('/:id', getNftById);
router.put('/:id',validarJwt, putNftUpdate);
router.delete('/:id',validarJwt, deleteNft);


module.exports = router;