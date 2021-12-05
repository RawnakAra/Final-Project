const recipes = require('../models/recipes.module')

const getAllRecipe = (req, res) => {
  recipes.find({}, (err, data) => {
    if (data)
      return res.status(200).json(data)
    return res.status(400).json(err)
  })
}

const searchForRecipeByName = (req, res) => {
  const { recipeNameToSearch } = req.body
  recipes.find({}, (err, data) => {
    if (err)
    return res.status(400).json(err)
    if(data){
     const searchedData = ( data.filter(r=> r.recipeName.toString().toLowerCase().includes(recipeNameToSearch.trim().toLowerCase())))
     return res.status(200).send(searchedData)
    }
  })
}

const searchByIngredients = (req, res) => {
  const { recipeIngredients } = req.body
  recipes.find({}, (err, data) => {
    //console.log(data)
    if (data){
     const searchData = data.filter(recipe=>{
        let isTrue = 0
       recipeIngredients.map(ingredient =>{
        // console.log(isTrue)
         if(recipe.ingredients.toString().toLowerCase().includes(ingredient.toString().toLowerCase())) 
          return isTrue += 1
        })
        if(isTrue === recipeIngredients.length) {
          return recipe
       }
    })  
   // console.log(searchData)
    return res.status(200).send(searchData)
    }
    return res.status(400).json(err)
  })
}

const postANewRecipe = (req, res) => {
  let newLink = new recipes(req.body)
  newLink.save((err, data) => {
    if (err) return res.status(404).send(err)
    return res.status(200).send(data)
  })
}



module.exports = {
  getAllRecipe,
  postANewRecipe,
  searchByIngredients,
  searchForRecipeByName
}