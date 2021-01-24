const express = require('express')
const router = express.Router()
const { addCategory, getCategory } = require('../controller/category')
const { requirelogin, adminMiddleware } = require('./common-middleware')

router.post('/category/create', requirelogin, adminMiddleware, addCategory)
router.get('/category/getcategory', getCategory)

module.exports = router 