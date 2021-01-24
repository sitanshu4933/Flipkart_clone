const express = require('express')
const router = express.Router()
const { addItemtoCart } = require('../controller/cart')
const { requirelogin, userMiddleware } = require('./common-middleware')

router.post('/user/cart/addtocart', requirelogin, userMiddleware, addItemtoCart)

module.exports = router 