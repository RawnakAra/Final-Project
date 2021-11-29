const jwt = require('jsonwebtoken')
const User = require('../models/login.model')

const admin = async(req,res,next)=>{
   try{
    const token = req.header('Authorization').replace('Bearer ','')
    const decoded = jwt.verify(token ,'helonewuser')
    //console.log(decoded)
    const user = await User.findOne({_id:decoded._id})
    console.log(user.id.toString())
    if(user.admin  && user.id.toString() !== req.params.id){
        if(decoded._id !== req.params){  //to make sure not to delete the admin acounte
          const usertodeletebyadmin = User.findById(req.params)
         // console.log(usertodeletebyadmin)
          req.usertodeletebyadmin = usertodeletebyadmin 
          next() 
        }
        else{
            res.status(404).send('can\'t delete the admin')
        }
    }else{
        res.status(401).send('stupid you are deleting the admin')
    }

   }catch(e){
    res.status(401).send({error : 'you are not an admin'})
   }
}

module.exports= admin
