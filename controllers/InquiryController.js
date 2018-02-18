Inquiry = require('../models/Inquiry')
var Promise = require('bluebird')
module.exports = {
  get: function(){
    return new Promise(function(resolve, reject){
      // null =
      Inquiry.find(null, function(err, inquiries){
        if (err){
          reject(err)
          return
        }
        resolve(inquiries)
      })
    })
  },

  getById: function(id){
    return new Promise(function(resolve, reject){
      Inquiry.findById(id, function(err, inquiry){
        if (err){
          reject(err)
          return
        }
        resolve(inquiry)
      })
    })
  },

  post: function(params){
    return new Promise(function(resolve, reject){
      Inquiry.create(params, function(err, inquiry){
       if (err){
         reject(err)
         return
       }
       console.log(inquiry)
       resolve(inquiry)
      })
    })
  },

  update: function(id, params){
    return new Promise(function(resolve, reject){
      Inquiry.findByIdAndUpdate(id, params, {new:true}, function(err, inquiry){
        if (err){
          reject(err)
          return
        }
        resolve(inquiry)
        return
      })
    })
  }
}
