var express = require('express');
var router = express.Router();
var Inquiry = require('../models/Inquiry')
var Project = require('../models/Project')
var helper = require('sendgrid').mail;
var from_email = new helper.Email('info@michaelmcveigh.io');
var to_email = new helper.Email('mmcveigh33@gmail.com');

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

router.get('/about', function(req, res, next){
  res.render('about', null)
})
router.get('/contact', function(req, res, next){
  res.render('contact', null)
})
router.get('/createProject', function(req, res, next){
  res.render('createProject', {

  })
})
router.get('/inquiries', function(req, res, next){
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



  Inquiry.find(null, function(err, inquiries){
    if (err){
      res.json({
        confirmation: 'fail',
        message: err
      })
      return
    }
    res.render('inquiries', {
      inquiries: inquiries,
    })
  })
})
module.exports = router;
