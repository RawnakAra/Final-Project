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
    admin:{
        type : Boolean,
        default : false
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

// userSchema.methods.pubicProfile = async function (){
//     const user = this
//     const userObject = user.toObject()
//      delete userObject.password
//      delete userObject.tokens
//     return userObject
// }

userSchema.methods.generateAuthToken = async function(){
    const user =this
    const token = jwt.sign({_id : user._id.toString()},'helonewuser',{expiresIn : '5h'})
    console.log(token)
    user.tokens = user.tokens.concat({token})
    console.log(user.tokens)
    await user.save()

    return token
} 

userSchema.statics.findByCredentials = async (email,password) => {
    const userlog = await user.findOne({email})
    if(!userlog){
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password ,userlog.password)
    if(!isMatch){
      
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

const user = mongoose.model('FinalProg', userSchema)

module.exports = user; 