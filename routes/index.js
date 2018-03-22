var express = require('express');
var router = express.Router();
var Project = require('../models/Project')

/* GET home page. */
router.get('/', function(req, res, next) {
  Project.find(null, function(err, projects){
    if (err){
      res.render('error', err)
    }
    res.render('index', {
      title: 'Michael McVeigh',
      projects: projects,
    });
  })
});

router.get('/:page', function(req, res, next){
  var page = req.params.page
  if (page == 'api'){
    next()
    return
  }
  if (page != 'inquiry'){
    staticPages = {
      about: 'about',
      createProject: 'createProject',
      contact: 'contact',
      confirmation: 'confirmation'
    }
    var template = staticPages[page]
    if (template == null){
      res.render('error', {message:'Invalid Page'})
      return
    }
    res.render(page, null)
  }
})


router.get('/project/:name', function(req, res, next){
  var name = req.params.name;
  Project.find({name: name}, null, function(err, project){
    if (err){
      res.render('error', {message: "I'm sorry, but this page simply does not exist"})
      return
    }
    project = project[0]
    res.render('project', {
      name: project.name,
      description: project.description,
      liveLink: project.liveLink,
      codeLink: project.codeLink,
      image: project.image,
      tools: project.tools
    })
  })
})


module.exports = router;
