var Project = require('../models/Project')
var Promise = require('bluebird')
module.exports = {
  get: function(){
    return new Promise(function(resolve, reject){
      // null =
      Project.find(null, function(err, projects){
        if (err){
          reject(err)
          return
        }
        resolve(projects)
      })
    })
  },

  getById: function(id){
    return new Promise(function(resolve, reject){
      Project.findById(id, function(err, project){
        if (err){
          reject(err)
          return
        }
        resolve(project)
      })
    })
  },

  post: function(params){
    return new Promise(function(resolve, reject){
      Project.create(params, function(err, project){
       if (err){
         reject(err)
         return
       }
       console.log(project)
       resolve(project)
      })
    })
  },

  update: function(id, params){
    return new Promise(function(resolve, reject){
      Project.findByIdAndUpdate(id, params, {new:true}, function(err, project){
        if (err){
          reject(err)
          return
        }
        resolve(project)
        return
      })
    })
  },

  remove: function(id){
    return new Promise(function(resolve, reject){
      Project.findByIdAndRemove(id, function(err){
        if (err){
          reject(err)
          return
        }
        resolve(null)
      })
    })
  }
}
