const express = require('express')
const auth = require('../midleware/auth')
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
}).delete('/user/delete',)

module.exports = router