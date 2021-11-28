const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const userSchema = new mongoose.Schema({
    name : {
        type : String,
        require : true,
        trim : true , //delete white space
        match:/^[a-zA-Z ]*$/
    },
    email : {
        type : String,
        unique : true,
        require : true,
        trim : true,
        lowercase : true,
        validate(v){
            if(!validator.isEmail(v)){
                return 'Email is invalid'
            }
            }
        
    },
    password : {
        type : String,
        require : true,
        min: 7,
        trim : true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

userSchema.methods.generateAuthToken = async function(){
    const user =this
    console.log(user)
}

const user = mongoose.model('User', userSchema)

module.exports = user; 