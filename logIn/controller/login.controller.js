const user = require('../models/login.model')

const getAllUsers = (req,res)=>{
    user.find({},(err , data)=>{
        if(err) 
        return res.status(230).send(err)
        return res. status(200).send(data)
    })
}

const regester =async (req,res)=>{
    const {name,email,password} = req.body
   const newUser = new user({name,email,password})
   try{
       await newUser.save()
       const token = await newUser.generateAuthToken()
       res.status(200).send({newUser ,token})
   }catch(e){
       res.status(400).send(e)
   }
//    newUser.save((err ,data)=>{
//     if(err)
//     return res.status(404).send(err.message)
//     return res.status(200).json(data)  
//    }) 
}

module.exports = {
    getAllUsers,
    regester
}