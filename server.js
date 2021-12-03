const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('dotenv').config()

app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/api/user', require('./logIn/router/login.router'))
app.use('/api/recipes', require('./webData/router/recipes.router'))

mongoose.connect(`${process.env.BD_URL}`,{useNewUrlParser: true ,  useUnifiedTopology: true ,useCreateIndex: true},()=>{
    console.log('conected to DB')
})
app.listen(process.env.PORT || 5000 , ()=>{
    console.log('port 5000')
})