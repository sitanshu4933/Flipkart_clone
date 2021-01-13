const { Router } = require('express')
const express = require('express')
const router=express.Router()
const {Signup,Signin, requirelogin}=require('../controller/auth')

router.post('/signin',Signin)
router.post('/signup',Signup)
router.post('/profile',requirelogin,(req,res)=>{
    console.log(req.user)
})

module.exports=router