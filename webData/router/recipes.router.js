const express = require('express')
const router = express.Router()
const recipesCntroller = require('../controller/recipes.controller')
router.get('/', (req, res) => {
    recipesCntroller.getAllRecipe(req, res)
})

router.post('/', (req, res) => {
    recipesCntroller.postANewRecipe(req, res)
})

// router.delete('/delete/:link', (req, res) => {
//     companyController.deleteLink(req, res)
// })

// router.put('/update/:link', (req, res) => {
//     companyController.updateLink(req, res)
// })

module.exports = router