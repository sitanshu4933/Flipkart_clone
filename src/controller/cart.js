const Cart = require('../models/cart')
module.exports.addItemtoCart = (req, res) => {

    Cart.findOne({ user: req.user._id })
        .exec((error, cart) => {
            if (error) return res.status(400).json({ error,message:"1" })
            if (cart) {
                const product = req.body.cartItems.product
                const item = cart.cartItems.find(c => c.product.toString() === product.toString()
                )
                if (item) {
                    Cart.findOneAndUpdate({ "user": req.user._id, "cartItems.product": product }, {
                        "$set": {
                            "cartItems": {
                                ...req.body.cartItems,
                                quantity: Number(item.quantity) + Number(req.body.cartItems.quantity)
                            }
                        }
                    })
                        .exec((error, _cart) => {
                            if (error) return res.status(400).json({ error,message:"2" })
                            if (_cart) return res.status(200).json({ cart: _cart })
                        })
                } else {
                    Cart.findOneAndUpdate({ user: req.user._id }, {
                        "$push": { "cartItems": req.body.cartItems }
                    })
                        .exec((error, _cart) => {
                            if (error) return res.status(400).json({ error,message:"3" })
                            if (_cart) return res.status(200).json({ cart: _cart })
                        })
                }
            } else {
                const _cart = new Cart({
                    user: req.user._id,
                    cartItems: [req.body.cartItems]
                })
                _cart.save((error, cart) => {
                    if (error) return res.status(400).json({ error,message:"4" })
                    if (cart) return res.status(200).json({ cart })
                })
            }
        })

}