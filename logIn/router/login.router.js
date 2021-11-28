const express = require('express')
const router = express.Router()
const userData = require('../controller/login.controller')

router.get('/',(req,res)=>{
    userData.getAllUsers(req ,res)
}).post('/user/regester',(req,res)=>{
    userData.regester(req,res)
})

module.exports = router