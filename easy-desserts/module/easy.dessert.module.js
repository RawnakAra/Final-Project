const mongoose = require('mongoose')

const easyDessertSchema = new mongoose.Schema({
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
  img:{
    type : String
  },
  like :{
    try:Number,
    default:0
  }
})

const easydessert = mongoose.model('easyDessert' ,easyDessertSchema)

module.exports = {
    easydessert 
  }