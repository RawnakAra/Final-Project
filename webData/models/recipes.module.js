const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
  recipeName : {
      type: String,
      require : true
  },
  ingredients : {
      type : String,
      require : true
  },
  instructions: {
    type : String,
    require : true
},
 url:{
    type : String,
    require : true
  },
  img:{
    type : String
  },
  like :{
    try:Number,
    default:0
  }
})

const recipeModel = mongoose.model('recipes' ,recipeSchema)

module.exports = {
  recipeModel
}
