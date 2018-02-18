var mongoose = require('mongoose')

var ProjectSchema = new mongoose.Schema({
  name: {type:String, default:''},
  description: {type:String, default:''},
  tools: {type:Array, default: []},
  image: {type:String, default:''},
  timestamp: {type:Date, default: Date.now}
})

module.exports = mongoose.model('ProjectSchema', ProjectSchema)
