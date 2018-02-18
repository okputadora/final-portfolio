var express = require('express');
var router = express.Router();


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
  var pages = ['jekart', 'crossword-constructor'];
  var name = req.params.name;
  // invalid page
  if (pages.indexOf(name) == -1){
    res.render('error', {message: "I'm sorry, but this page simply does not exist"})
  }
  res.render(name, null)
})

module.exports = router;
