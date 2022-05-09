const User = require('../models/User');
const Nft = require ('../models/Nft');

const getAllNfts = async (req, res) => {
    try {
        //? si hay un parametro search, busca por ese parametro
        if (req.query.search && req.query.search !== '') {
            
            const count = await Nft.countDocuments({ name: { $regex: req.query.search, $options: 'i' }});
            let search = req.query.search
            const pagination = {
                page: req.query.page || 1,
                limit: parseInt(req.query.limit) || count,
                sort: req.query.sort || 'create_date'
            }
            const getNftsSearch = await Nft.aggregate([
                { $match: { name: { $regex: search, $options: 'i' } } },  
                { $sort: { create_date: -1 } },
                { $skip: (pagination.page - 1) * pagination.limit },
                { $limit: pagination.limit },
                
                { $lookup: {
                    from: 'categories',
                    localField: 'category',
                    foreignField: '_id',
                    as: 'category'
                    }
                },
                { $unwind: {
                    path: '$category',
                    preserveNullAndEmptyArrays: true
                    }
                },
                { $lookup: {
                    from: 'collection_nfts',
                    localField: 'collection_nft',
                    foreignField: '_id',
                    as: 'collection_nft'
                    }
                },
                { $unwind: {
                    path: '$collection_nft',
                    preserveNullAndEmptyArrays: true
                    }
                },
                { $lookup: {
                    from: 'currencies',
                    localField: 'currencies',
                    foreignField: '_id',
                    as: 'currencies'
                    }
                },
                { $unwind: {
                    path: '$currencies',
                    preserveNullAndEmptyArrays: true
                    }
                },
                { $lookup: {
                    from: 'sales_types',
                    localField: 'sales_types',
                    foreignField: '_id',
                    as: 'sales_types'
                    }
                },
                { $unwind: {
                    path: '$sales_types',
                    preserveNullAndEmptyArrays: true
                    }
                },
                { $lookup: {
                    from: 'files_types',
                    localField: 'files_types',
                    foreignField: '_id',
                    as: 'files_types'
                    }
                },
                { $unwind: {
                    path: '$files_types',
                    preserveNullAndEmptyArrays: true
                    }
                },
                { $lookup: {
                    from: 'users',
                    localField: 'details.owner',
                    foreignField: '_id',
                    as: 'details.owner'
                    }
                },
                { $unwind: '$details.owner' },
                { $lookup: {
                    from: 'users',
                    localField: 'details.user_creator',
                    foreignField: '_id',
                    as: 'details.user_creator'
                    }
                },
                { $unwind: '$details.user_creator' },
                { $project: {
                    name: 1,
                    image: 1,
                    description: 1,
                    details: {
                        user_creator: {
                            username: 1
                        },
                        owner: {
                            username: 1
                        },
                        contract_address: 1,
                        token_id: 1
                    },
                    category: {
                        name: 1
                    },
                    collection_nft: {
                        name: 1
                    },
                    currencies: {
                        name: 1,
                        image: 1
                    },
                    sales_types: {
                        name: 1
                    },
                    files_types: {
                        name: 1
                    },
                    create_date: 1,
                    price: 1,
                    likes: 1,
                    }
                }
            ]);
        
            return res.status(200).json({
                ok: true,
                nfts: getNftsSearch,
                total: getNftsSearch.length,
                ...pagination
            });
        
        }
        const total = await Nft.countDocuments();
        const pagination = {
            page: req.query.page || 1,
            limit: parseInt(req.query.limit) || total,
            sort: req.query.sort || 'create_date'
        }
        const countPages = Math.ceil(total / pagination.limit);
        const getAllNfts = await Nft.aggregate([
            //? skip limit 
            { $skip: (pagination.page - 1) * pagination.limit },
            { $limit : pagination.limit },
            { $sort: { create_date: -1 } },
            
            { $lookup: {
                    from: 'categories',
                    localField: 'category',
                    foreignField: '_id',
                    as: 'category'
                }
            },
            {
                $unwind: {
                    path: '$category',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: 'collection_nfts',
                    localField: 'collection_nft',
                    foreignField: '_id',
                    as: 'collection_nft'
                }
            },
            {
                $unwind: {
                    path: '$collection_nft',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                //? si no viene no importa
                $lookup: {
                    from: 'currencies',
                    localField: 'currencies',
                    foreignField: '_id',
                    as: 'currencies'
                }
            },
            {
                $unwind: {
                    path: '$currencies',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: 'sales_types',
                    localField: 'sales_types',
                    foreignField: '_id',
                    as: 'sales_types'
                }
            },
            {
                $unwind: {
                    path: '$sales_types',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: 'files_types',
                    localField: 'files_types',
                    foreignField: '_id',
                    as: 'files_types'
                }
            },
            {
                $unwind: {
                    path: '$files_types',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'details.owner',
                    foreignField: '_id',
                    as: 'details.owner'
                }
            },
            {  
                $unwind: '$details.owner'
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'details.user_creator',
                    foreignField: '_id',
                    as: 'details.user_creator'
                }
            },
            {
                $unwind: '$details.user_creator'
            },
            {
                $project: {
                    name: 1,
                    image: 1,
                    description: 1,
                    details: {
                        user_creator: {
                            username: 1
                        },
                        owner: {
                            username: 1
                        },
                        contract_address: 1,
                        token_id: 1
                    },
                    category: {
                        name: 1
                    },
                    collection_nft: {
                        name: 1
                    },
                    currencies: {
                        name: 1,
                        image: 1
                    },
                    sales_types: {
                        name: 1
                    },
                    files_types: {
                        name: 1
                    },
                    create_date: 1,
                    price: 1,
                    likes: 1,
                }
            }    
        ]);
        
        res.status(200).json({
            ok: 'true',
            getAllNfts,
            total,
            ...pagination
        });

    } catch (error) {
        res.status(404).json({
            ok: 'false',
            msg: '404 Not Found'
        });
        console.log(error);
    };
};

const createNft = async (req, res) => {
    
    try {
        
        const obj = { ...req.body, likes: 0 }
        const nft = new Nft(obj);
        await nft.save();
        res.status(200).json({
            ok: 'true',
            msg: 'NFT created'
        });

    }
    catch (error) {
        res.status(500).json({
            ok: 'false',
            msg: "Unexpected error"
        });
        console.log(error);
    };
};

const getNftById = async (req, res) =>{
    const { id } = req.params;
    try {
    
        const getById = await Nft.findById(id)
            .populate('category', { name:1, _id:0})
            .populate('collection_nft', { name:1, _id:0})
            .populate('currencies', { name:1, _id:0})
            .populate('sales_types', { name:1, _id:0})
            .populate('files_types', { name:1, _id:0})
            .populate('details.owner', { username:1, _id:0})
            .populate('details.user_creator', { username:1, _id:0})
        res.status(200).json( getById );   
    
    } catch (error) {
        res.status(404).json({
            ok: 'false',
            msg: 'Id Not Found'
        });
        console.log(error);
    };
};

const putNftUpdate = async (req, res) => {
    const { id } = req.params;
    try {
        if(req.body.likes){
            const userFav = await User.findById(req.uid);
            const nftLikes = await Nft.findById(id);
            if (userFav.favorite.includes(id)) {
                console.log(userFav.favorite.includes(id));
                
                const userPull = await User.findByIdAndUpdate(req.uid, { $pull: { favorite: id } }, { new: true })
                .populate('user_type', 'name')
                .populate('favorite', 'name');
                const obj = { ...req.body, likes: nftLikes.likes - 1 }
                const nftLike = await Nft.findByIdAndUpdate(id, obj, { new: true });
            
                return res.status(200).json({
                    ok: 'true',
                    nft: nftLike,
                    user: userPull
                });
            }
            else {
                const user = await User.findByIdAndUpdate(req.uid, { $push: { favorite: id } }, { new: true })
                .populate('user_type', 'name')
                .populate('favorite', 'name');
                const obj = { ...req.body, likes: nftLikes.likes + 1 }
                const nft = await Nft.findByIdAndUpdate(id, obj, { new: true });
                
                return res.status(200).json({
                    ok: 'true',
                    nft,
                    user
                });
            }

        }
        else {
            const nft = await Nft.findByIdAndUpdate(id, req.body, { new: true });
            res.status(200).json({
                ok: 'true',
                nft
            });
        }


        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error'
        });
    }
};

const deleteNft = async (req, res) => {
    const { id } = req.params;
    try {
        const nftDelete = await Nft.findByIdAndDelete(id);
        res.json(nftDelete);
    } catch (error) {
        // console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error'
        });
    }
};

module.exports = { getAllNfts, createNft, putNftUpdate, deleteNft, getNftById };
