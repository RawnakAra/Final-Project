const express = require('express')
const router = express.Router()
const easyDessertController = require('../controller/easy.dessert.controller')

router.get('/', async(req, res)=> {
   await easyDessertController.getAllRecipe(req, res)
}).get('/new', async(req, res)=> {
    await easyDessertController.getAllNewRecipe(req, res)
 }).post('/searchbyname',async(req,res)=>{
    await easyDessertController.searchForRecipeByName(req,res)
}).post('/searchbyingredients' ,async(req,res)=>{
    await easyDessertController.searchByIngredients(req,res)
}).post('/addNewRecipe', async(req, res)=> {
   await easyDessertController.postANewRecipe(req, res)
}).put('/update/:id',async(req,res)=>{
    await easyDessertController.updateData(req,res)
})

module.exports = router