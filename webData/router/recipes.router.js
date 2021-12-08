const express = require('express')
const router = express.Router()
const recipesCntroller = require('../controller/recipes.controller')

router.get('/', async(req, res)=> {
   await recipesCntroller.getAllRecipe(req, res)
}).post('/searchbyname',async(req,res)=>{
    await recipesCntroller.searchForRecipeByName(req,res)
}).post('/searchbyingredients' ,async(req,res)=>{
    await recipesCntroller.searchByIngredients(req,res)
}).post('/', async(req, res)=> {
   await recipesCntroller.postANewRecipe(req, res)
})

module.exports = router