const recipeModel = require('../models/recipes.module').recipeModel
const recipeNewModel=require('../models/recipeNew.modul').recipeNewModel

const getAllRecipe = async (req, res) => {
  try {
    recipeNewModel.find({}, (err, data) => {
      if (data)
        return res.status(200).json(data)
      return res.status(400).json(err)
    })
  } catch (e) {
    res.status(503).send(e.massege)
  }
}

const getAllNewRecipe = async (req, res)=>{
  try {
    recipeNewModel.find({}, (err, data) => {
      if (data)
        return res.status(200).json(data)
      return res.status(400).json(err)
    })
  } catch (e) {
    res.status(503).send(e.massege)
  }
}


const searchForRecipeByName = async (req, res) => {
  const { recipeNameToSearch } = req.body
  try {
    recipeNewModel.find({}, (err, data) => {
      if (err)
        return res.status(400).json(err)
      if (data) {
        const searchedData = (data.filter(r =>{
          const searching = recipeNameToSearch.toLowerCase() 
        return r.recipeName.toString().toLowerCase().includes(searching)
        })
        )
        return res.status(200).send(searchedData)
      }
    })
  } catch (e) {
    res.status(503).send(e.massege)
  }
}


const searchByIngredients = (req, res) => {
  try{
  const { recipeIngredients } = req.body
 // console.log(recipeIngredients)
 recipeNewModel.find({}, (err, data) => {
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
    //console.log(searchData)
    return res.status(200).send(searchData)
    }
    return res.status(400).json(err)
  })
}catch(e){
  return res.status(500).send(e.massege)
}
}

const postANewRecipe = async (req, res) => {
  let newLink = new recipeNewModel(req.body)
  try {
    newLink.save((err, data) => {
      if (err) return res.status(404).send(err)
      return res.status(200).send(data)
    })
  } catch (e) {
    res.status(503).send(e.massege)
  }
}


const updateData =async (req,res)=>{
  const { id } = req.params
  let likestoUpdate = req.body
  try{
   recipeNewModel.findById(id,(err ,data )=>{
      console.log(data.like)
      console.log(likestoUpdate)
     recipeNewModel.findByIdAndUpdate(id,{like : likestoUpdate.like},{runValidators : true , new : true},(err,data1)=>{
        console.log(data1)
        if(err)
        return res.status(400).send(e.massege)
        return res.status(200).send(data1)
      })
    })
  }catch(e){
    res.status(503).send(e.massege)
  }
  
}

module.exports = {
  getAllRecipe,
  getAllNewRecipe,
  postANewRecipe,
  searchByIngredients,
  searchForRecipeByName,
  updateData
}