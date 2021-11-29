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
    const token = jwt.sign({_id : user._id.toString()},'helonewuser')
   console.log(token)
    user.tokens = user.tokens.concat({token})
    console.log(user.tokens)
    await user.save()

    return token
} 

userSchema.statics.findByCredentials = async (email,password) => {
    const userlog = await user.findOne({email})
    console.log("user",userlog);
    if(!userlog){
        console.log('!userlog')
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password ,userlog.password)

    if(!isMatch){
        console.log('!isMatch')
        throw new Error('Unable to login')
    }
    return userlog
}

// Hash the plain text password before saving
userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const user = mongoose.model('User', userSchema)

module.exports = user; 