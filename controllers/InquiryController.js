Inquiry = require('../models/Inquiry')
var Promise = require('bluebird')
var helper = require('sendgrid').mail;


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

    // send email via sendgrid
    var from_email = new helper.Email(params.email);
    var to_email = new helper.Email('mmcveigh33@gmail.com');
    var subject = params.subject;
    var content = new helper.Content('text/plain', params.message);
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
    })
    // add to database
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
  },
  remove: function(id){
    return new Promise(function(resolve, reject){
      Inquiry.findByIdAndRemove(id, function(err, result){
        if (err){
          reject(err)
          return
        }
        resolve(inquiry)
      })
    })
  }
}
