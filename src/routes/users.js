const router = require('express').Router();
const { check } = require('express-validator')
//? controllers 
const { createUser, getUser, getUsers, updateUser, deleteUser } = require("../controllers/users.controllers");
//! joi validator o check validator
const { validarCampos } = require('../middlewares/validar.campos.js');
const { validarJwt } = require('../middlewares/validarJwt.js');
const { validarADMIN_ROLE } = require('../middlewares/validarAdminRole.js');

router.post('/',
    [
        check('username', 'El nombre de usuario es obligatorio').not().isEmpty(),
        check('firstName', 'El nombre es obligatorio').not().isEmpty(),
        check('lastName', 'El apellido es obligatorio').not().isEmpty(),
        check('email', 'El email es requerido y debe ser valido').not().isEmpty().isEmail(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        validarCampos
    ], 
    createUser
);
router.get('/', 
        [
            validarJwt,
           validarADMIN_ROLE
        ],
        getUsers);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser); //? gaby puto

module.exports = router;
