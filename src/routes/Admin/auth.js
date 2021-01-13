const { Router } = require('express')
const express = require('express')
const router=express.Router()
const {Signup,Signin, requirelogin}=require('../../controller/Admin/auth')

router.post('/admin/signin',Signin)
router.post('/admin/signup',Signup)
router.post('/profile',requirelogin,(req,res)=>{
    console.log(req.user)
})

module.exports=router