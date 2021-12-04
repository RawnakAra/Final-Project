const recipes = require('../models/recipes.module')
const getDataFunc = require('../index')
//const data = getDataFunc()

const getAllRecipe = (req, res) => {
  recipes.find({}, (err, data) => {
    if (data)
      return res.status(200).json(data)
    return res.status(400).json(err)
  })
}

const serchForRecipeByName = (req,res)=>{
  const {recipeName} = req.body
  recipes.find({recipeName:{$all : recipeName}},(err,data)=>{
    if (data)
    return res.status(200).json(data)
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
  serchForRecipeByName
}