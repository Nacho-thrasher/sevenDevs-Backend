const bcrypt = require('bcrypt');
const Usuario = require("../models/User.js");
const User_type = require("../models/User_type.js");
const { generateJwt } = require('../helpers/generateJwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async (req, res) => {
    //? login comun por ahora
    const { email, password } = req.body;
    try {
        //? validar email
        const existEmail = await Usuario.findOne({ email })
        .populate('user_type', 'name')
        .populate('favorite', 'name');

        if (!existEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'The email is not registered'
            });
        };
        //? validar password
        const validPassword = await bcrypt.compareSync(password, existEmail.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'The password is wrong'
            });
        };
        //? si confirm email es false no puede logearse
        // if (!existEmail.confirm_email) {
        //     return res.status(400).json({
        //         ok: false,
        //         msg: 'El email no ha sido confirmado'
        //     });
        // }
        //? generar jwt
        const token = await generateJwt(existEmail.id);
        //? respuesta
        res.json({
            ok: true,
            usuario: existEmail,
            token
        });
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error'
        });
    };
};

const googleSignIn = async (req, res) => {
    const googleToken = req.body.tokenId;
    const { givenName, familyName } = req.body;
    try {
        const { name, email, img } = await googleVerify(googleToken);
        const usuarioDb = await Usuario.findOne({ email });
        //? role user set id user comun default
        const user_type = await User_type.findOne({ name: 'user' });
        let usuario;
        //? create user
        if (!usuarioDb) {
            usuario = new Usuario({
                username: name,
                firstName: givenName,
                lastName: familyName,
                email,
                image: img,
                password: ':)',
                user_type: user_type._id
            });
        }
        else{
            usuario = usuarioDb;
        }
        await usuario.save();
        const token = await generateJwt(usuario.id);
        res.json({
            ok: true,
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error'
        });
    };
};

const renewToken = async (req, res) => {

    const uid = req.uid;
    const token = await generateJwt(uid);
    const usuario = await Usuario.findById(uid).populate('user_type', 'name');
    res.json({
        ok: true,
        usuario,
        token
    });
};

//?export 
module.exports = { 
    login,
    googleSignIn,
    renewToken
}
