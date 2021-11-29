const user = require('../models/login.model')


const getAllUsers = (req,res)=>{
    user.find({},(err , data)=>{
        if(err) 
        return res.status(404).send(err)
        return res. status(200).send(data)
    })
}

const register =async (req,res)=>{
    const {name,email,password} = req.body
   const newUser = new user({name,email,password})
   try{
       await newUser.save()
       const token = await newUser.generateAuthToken()
       res.status(200).send({newUser ,token})
   }catch(e){
       res.status(500).send(e)
   }
}

const logIn =async (req,res)=>{
  try{
      //console.log('first try')
      const userlog = await user.findByCredentials(req.body.email,req.body.password);
      //console.log("userlog" , userlog);
      const token = await userlog.generateAuthToken();
      //console.log("token" , token);
      res.status(200).send({userlog ,token})
  }catch(e){
    //console.log("catch");
      res.status(404).send(e)
  }
}

const logOut =async (req,res)=>{
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        console.log(req.user)
     await req.user.save()
     res.status(200).send('logout')
    }catch(e){
        res.status(404).send(e)
    }
}

module.exports = {
    getAllUsers,
    register,
    logIn,
    logOut
}