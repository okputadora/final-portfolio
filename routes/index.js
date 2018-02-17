var express = require('express');
var router = express.Router();
var Inquiry = require('../models/Inquiry')
var helper = require('sendgrid').mail;
var from_email = new helper.Email('info@michaelmcveigh.io');
var to_email = new helper.Email('mmcveigh33@gmail.com');

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
    Inquiry.create(req.body, function(err, inquiry){
      if (err){
        res.json({
          confirmation: 'fail',
          message: err
        })
        return
      }
      var subject = req.body.subject;
      var content = new helper.Content('text/plain', req.body.message);
      var mail = new helper.Mail(from_email, subject, to_email, content);
      var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
      var request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON(),
      });

      sg.API(request, function(error, response) {
        console.log(response.statusCode);
        console.log(response.body);
        console.log(response.headers);
        if (error){
          res.json({
            confirmation: 'fail',
            message: error
          })
          return
        }
        res.redirect('confirmation')
      });
    })
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

router.get('/inquiries', function(req, res, next){

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
