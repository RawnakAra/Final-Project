const express = require('express')
const router = express.Router()
const recipesCntroller = require('../controller/recipes.controller')
router.get('/', (req, res) => {
   await recipesCntroller.getAllRecipe(req, res)
}).get('/searchbyname',(req,res)=>{
    await recipesCntroller.searchForRecipeByName(req,res)
}).get('/searchbyingredients' , (req,res)=>{
    await recipesCntroller.searchByIngredients(req,res)
}).post('/', (req, res) => {
   await recipesCntroller.postANewRecipe(req, res)
})

module.exports = router