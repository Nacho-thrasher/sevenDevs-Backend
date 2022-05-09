const expressfileUpload = require('express-fileupload');
const { Router } = require('express');
const { validarJwt } = require('../middlewares/validarJwt.js');
const router = Router();
const { UploadCloud } = require('../controllers/upload.controllers.js');

router.use(expressfileUpload({useTempFiles: true}));
//@ tipo: 'nft', 'user', 'collection', id: 'id del nft, user, collection'
router.put('/:tipo/:id', validarJwt, UploadCloud)

module.exports = router;