const jwt = require('jsonwebtoken')
const userModel = require('../models/login.model')

const auth = async (req, res, next)=>{
    try{
        console.log('ee')
      const token = req.header('Authorization').replace('Bearer ','')
      console.log("token",token)
      const decoded = jwt.verify(token ,'helonewuser')
      console.log("decoded",decoded)
      const user = await userModel.findOne({_id : decoded._id , "tokens.token":token})
      console.log(user)

      if(!user){
          throw new Error()
      }
      req.token = token
      req.user = user
      next() 
    }catch(e){
        res.status(230).send({error : 'Please authenticate'})
    }
}

module.exports = auth