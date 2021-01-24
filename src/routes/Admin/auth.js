const { Router } = require('express')
const express = require('express')
const router=express.Router()
const {Signup,Signin}=require('../../controller/Admin/auth')
const {requirelogin}=require('../common-middleware/index')
const { validateSigninRequest,validateSignupRequest, isRequestValidated } = require('../validators/auth')

router.post('/admin/signin',validateSigninRequest,isRequestValidated,Signin)
router.post('/admin/signup',validateSignupRequest,isRequestValidated,Signup)
router.post('/profile',requirelogin,(req,res)=>{
    console.log(req.user)
})

module.exports=router