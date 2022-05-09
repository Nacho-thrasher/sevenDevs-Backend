const bcrypt = require('bcrypt');
const User = require("../models/User.js");
const User_type = require("../models/User_type.js");
const Nfts = require("../models/Nft.js");
const { generateJwt } = require('../helpers/generateJwt');
const { response } = require('express');
const nodemailer = require('nodemailer')
// createUser, getUser, getUsers, updateUser, deleteUser 

const createUser = async (req, res) => {
    //? agregar usuario  //? phone
    const { username, firstName, lastName, email, password } = req.body;
    try {
        //? validar nickname !importante y email
        const existEmail = await User.findOne({ email });
        if (existEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'This email is already registered'
            });
        }
        //? role user set id user comun default
        const user_type = await User_type.findOne({ name: 'user' });
        const usuario = new User({
            username,
            firstName,
            lastName,
            email,
            password,
            user_type: user_type._id,
            image: 'https://res.cloudinary.com/hysmatafuegos/image/upload/v1651516047/sevenDevs/avatardefault_92824_s6mwzv.png'
        });
        //? encriptar password
        const salt = await bcrypt.genSalt(10);
        usuario.password = bcrypt.hashSync(password, salt);
        //? guardar usuario
        await usuario.save();
        //? enviar email de confirmacion de registro
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'nachoburgos1995@gmail.com',
                pass: 'mtlsdatewtbcwhbf'
            }
        });
        const mailOptions = {
            from: "SevenDevsNfts <",
            to: usuario.email,
            subject: 'Confirmation of registration',
            text: 'Hello ' + usuario.firstName + ' ' + usuario.lastName + '\n\n' +
                'Thank you for registering on SevenDevsNfts.\n' +
                'To confirm your registration, please click on the following link:\n\n' +
                'http://localhost:3000/confirmar/' + usuario._id + '\n\n' +
                "If it doesn't work, copy and paste the link into your browser.\n\n" +
                'Thank you,\n' +
                'SevenDevsNfts'
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        //? generar jwt
        const token = await generateJwt(usuario.id);
        //? respuesta
        res.json({
            ok: true,
            usuario,
            token
        });

    } 
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error'
        });
    }

}
const getUsers = async (req, res) => {
    
    //? obtener usuarios //? paginacion
    const { page = 1, limit = 10 } = req.query; 
    const start = (page - 1) * limit;
    const end = page * limit;
    try {
        
        const users = await User.find({})
            .skip(start)
            .limit(limit)
            .populate('user_type', 'name')
            .exec();
        const total = await User.countDocuments();
        const countPages = Math.ceil(total / limit);
        res.json({
            ok: true,
            user: req.uid, //@ id del usuario que esta logueado
            users,
            total,
            end,
            countPages
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error'
        });
    }
}

const getUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        res.json(user)

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error'
        });
    }
    
}

const updateUser =  (req, res) => {
    
    const { id } = req.params;
    const user = req.body;
    const newUserInfo = {
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        image: user.image,
        favorite: user.favorite,
        description: user.description
    }

    User.findByIdAndUpdate( id, newUserInfo, { new: true })
          .then(result => {
              res.json(result)
          })
          .catch(e => console.log(e))
}
       

const deleteUser = async (req, res) => {

    const { id } = req.params
    //? borrar nfts del usuario en details owner
    await User.findByIdAndDelete(id);
    return new Promise((resolve, reject) => {
        Nfts.deleteMany({ 'details.owner': id }, (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    })
    .then(result => {
        res.json(result)
    })
    .catch(e => console.log(e))

}


module.exports = { createUser, getUser, getUsers, updateUser, deleteUser };