const router = require('express').Router();
const { check } = require('express-validator')
//? controllers 
const { login, googleSignIn, renewToken } = require("../controllers/auth.controllers");
const { validarCampos } = require('../middlewares/validar.campos.js');
const { validarJwt } = require('../middlewares/validarJwt');

router.post('/',
    [
        check('email', 'Email is required and must be valid').not().isEmpty().isEmail(),
        check('password', 'Password is required').not().isEmpty(),
        validarCampos
    ],
    login
);
router.post('/google', googleSignIn);
router.get('/renew', validarJwt, renewToken)


module.exports = router;