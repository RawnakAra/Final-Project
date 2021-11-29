const express = require('express')
const auth = require('../midleware/auth')
const admin = require('../midleware/admin')
const router = express.Router()
const userData = require('../controller/login.controller')

router.get('/',(req,res)=>{
    userData.getAllUsers(req ,res)
}).post('/user/register',(req,res)=>{
    userData.register(req,res)
}).post('/user/login',(req,res)=>{
    userData.logIn(req,res)
}).post('/user/logout',auth ,async(req,res)=>{
   await userData.logOut(req,res)
}).post('/user/logoutAll',auth , async(req,res)=>{
    await userData.logOutAll(req,res)
}).delete('/delete',auth , async(req,res)=>{
    await userData.deleteUser(req,res)
}).delete('/delete/:id',admin , async(req,res)=>{
    await userData.deleteUserByAdmin(req,res)
}).put('/update/:id',(req,res)=>{
    userData.toUpdate(req,res)
})

module.exports = router