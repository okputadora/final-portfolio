var express = require('express');
var router = express.Router();

var helper = require('sendgrid').mail;
var from_email = new helper.Email('test@example.com');
var to_email = new helper.Email('mmcveigh33@gmail.com');
var subject = 'Hello World from the SendGrid Node.js Library!';
var content = new helper.Content('text/plain', 'Hello, Email!');
var mail = new helper.Mail(from_email, subject, to_email, content);

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
      res.json({
        confirmation: 'success',
        response: response.body})
    });
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
