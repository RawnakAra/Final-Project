const recipes = require('../models/recipes.module')
const getDataFunc = require('../index')
const data = getDataFunc()

const getAllRecipe = (req, res) => {
  (data.map(rese=>{
    console.log("data", rese)
  }))
  recipes.find({}, (err, data) => {
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

// const deleteLink = (req, res) => {
//   const { link } = req.params
//   recipes.findByIdAndDelete(link, (err, data) => {
//     if (err) throw err
//     if (data) {
//       return res.status(200).send(data)
//     }
//     return res.status(400).json({ error: 'item not found' })
//   })
// }
// const updateLink = (req, res) => {
//   const { link } = req.params
//   const { Name, Email, LinkedinLink, WhereDidYouFindTheData } = req.body
//   recipes.findByIdAndUpdate(link, { Name: Name, Email: Email, LinkedinLink: LinkedinLink, WhereDidYouFindTheData: WhereDidYouFindTheData }, { new: true, runValidators: true }, (err, data) => {
//     if (err) throw err
//     if (data) {
//       return res.status(200).send(data)
//     }
//     return res.status(400).json({ error: 'item not found' })
//   })
// }
module.exports = {
  getAllRecipe,
  postANewRecipe,
  //deleteLink,
  //updateLink
}