const express = require('express')
const router = express.Router()
const recipesCntroller = require('../controller/recipes.controller')
router.get('/', (req, res) => {
    recipesCntroller.getAllRecipe(req, res)
}).get('/searchbyname',(req,res)=>{
    recipesCntroller.serchForRecipeByName(req,res)
}).post('/', (req, res) => {
    recipesCntroller.postANewRecipe(req, res)
})

module.exports = router