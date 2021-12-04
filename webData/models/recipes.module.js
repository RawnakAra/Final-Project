const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
  name : {
      type: String,
      require : true
  },
  // totalTime : {
  //     type : String
  // },
  ingredients : {
      type : String,
      require : true
  },
  instructions:{
    type : String,
    require : true
  },
  img:{
    type : String
  }
})

const recipes = mongoose.model('FinalProg' , recipeSchema)

module.exports = recipes
