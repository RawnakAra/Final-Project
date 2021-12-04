const express = require('express')
const router = express.Router()
const recipesCntroller = require('../controller/recipes.controller')
router.get('/', (req, res) => {
    recipesCntroller.getAllRecipe(req, res)
}).get('/searchbyname',(req,res)=>{
    recipesCntroller.searchForRecipeByName(req,res)
}).get('/searchbyingredients' , (req,res)=>{
    recipesCntroller.searchByIngredients(req,res)
}).post('/', (req, res) => {
    recipesCntroller.postANewRecipe(req, res)
})

module.exports = router