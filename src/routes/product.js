const express = require('express')
const router = express.Router()
const { createProduct } = require('../controller/product')
const { requirelogin, adminMiddleware } = require('./common-middleware')
const multer=require('multer')
const path=require('path')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname),'uploads'))
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname + '-' + Date.now())
    }
  })
   
  var upload = multer({ storage})

router.post('/product/create', requirelogin, adminMiddleware,upload.array('productPicture'),createProduct)

module.exports = router 