const { default: slugify } = require('slugify')
const Product = require('../models/product')
module.exports.createProduct = (req, res) => {

    const { name, price,quantity, description, category } = req.body
    let productPicture = []
    if (req.files.length > 0) {
        productPicture = req.files.map(file => {
            return {
                img: file.filename
            }
        })
    }
    const _product = new Product({
        name,
        slug: slugify(name),
        price,
        quantity,
        description,
        productPicture,
        category,
        createdBy: req.user._id
    })
    _product.save((error, product) => {
        if (error) return res.status(400).json({ message: error })
        if (product) return res.status(200).json({ product })
        else{
            return res.status(400).json({message:"something went wrong"})
        }
    })
}