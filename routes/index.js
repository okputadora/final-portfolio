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
module.exports = router;
