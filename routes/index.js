var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Michael McVeigh',
    projects: {}
  });

});

router.get('/about', function(req, res, next){
  res.render('about', null)
})

router.get('/contact', function(req, res, next){
  res.render('contact', null)
})

router.post('/:action', function(req, res, next){
  var action = req.params.action
  if (action == 'contact'){
    console.log(req.body);
    res.redirect('confirmation')
  }
})

router.get('/confirmation', function(req, res, next){
  res.render('confirmation')
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
