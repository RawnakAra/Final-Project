const express = require('express')
const router = express.Router()
//const multer = require('multer')
const recipesCntroller = require('../controller/recipes.controller')

router.get('/', async(req, res)=> {
   await recipesCntroller.getAllRecipe(req, res)
}).get('/new', async(req, res)=> {
    await recipesCntroller.getAllNewRecipe(req, res)
 }).post('/searchbyname',async(req,res)=>{
    await recipesCntroller.searchForRecipeByName(req,res)
}).post('/searchbyingredients' ,async(req,res)=>{
    await recipesCntroller.searchByIngredients(req,res)
}).post('/addNewRecipe', async(req, res)=> {
   await recipesCntroller.postANewRecipe(req, res)
}).put('/update/:id',async(req,res)=>{
    await recipesCntroller.updateData(req,res)
})
// const upload = multer({
//     dest :'images',
//     limits:{
//        fileSize : 10000000 // mb
//     },
//     fileFilter(req,file,cb){
//         if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
//            return cb(new Error('file must be a image'))  
//         }
//         cb(undefined , true)
//     }
// })
// const errMiddleware =(req,res,next)=>{
//     throw new Error('middleware error')
// }

// router.post('/upload',upload.single('upload'),(req,res)=>{
//     res.send()
// },(error,req,res,next)=>{
//   return res.status(400).send({error :error.message})
// })
module.exports = router