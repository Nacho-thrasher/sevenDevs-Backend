const cloudinary = require('cloudinary').v2;
//? modelos
const User = require("../models/User.js");
const Nft = require("../models/Nft");
const Collection = require("../models/Collection_nft");

//? cloudinary config
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY_CL,  
    api_secret: process.env.API_SECRET_CL,  
    shorten: true,
    secure: true
});

const updateImageCloudinary = async(tipo, id, url) => {

    switch (tipo) {
        case 'user':
            const userFile = await User.findById(id);
            // console.log(userFile, url, tipo);
            if (!userFile) {
                return false;
            }
            //? actualizar imagen
            userFile.image = url
            await userFile.save();
            return true;
        case 'nft':
            const nftFile = await Nft.findById(id);
            if (!nftFile) {
                return false;
            }
            nftFile.image = url;
            await nftFile.save();
            return true;
        case 'collection':
            const collectionFile = await Collection.findById(id);  
            if (!collectionFile) {
                return false;
            }
            collectionFile.image = url;
            await collectionFile.save();
            return true;
        default:
            return false;
    }  

}

module.exports = { updateImageCloudinary };