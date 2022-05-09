const Nft = require ('../models/Nft');

const orderNft = async (req, res) => {
    
    try {
        const nfts = await Nft.find({})
        .populate('category', { name:1, _id:0})
            .populate('collection_nft', { name:1, _id:0})
            .populate('currencies', { name:1, image: 1, _id:0})
            .populate('sales_types', { name:1, _id:0})
            .populate('files_types', { name:1, _id:0})
            .populate('details.owner', { username:1, _id:0})
            .populate('details.user_creator', { username:1, _id:0})
        // console.log(nfts)
        
        const order = nfts === 'asc-desc' ?
        nfts.sort(function(a,b) {
            return b.price - a.price;
        }) : 
        nfts.sort(function(a,b) {
            return a.price - b.price;
        })
        
        res.json(order)

    } catch (error) {
        // console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error'
        });
    }
    
}

module.exports = {orderNft}

