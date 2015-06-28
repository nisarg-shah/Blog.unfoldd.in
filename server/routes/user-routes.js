var express  = require('express'),
    _        = require('lodash'),
    config   = require('../config'),
    jwt      = require('jsonwebtoken'),
    mongoose = require('mongoose'),
    User     = require('../models/users');

var app = module.exports = express.Router();

var users = mongoose.model('user',User);


function createToken(user) {
  return jwt.sign(_.omit(user, 'password'), config.secret, { expiresInSeconds: 60*120 });
}

app.post('/signup', function(req, res) {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send("You must send the email and the password");
  }
  else{
    users.findOne({ 'email' :  req.body.email }, 
      function(err, users) {
        // In case of any error, return using the done method
        if (err)
          return res.json(err);
        
        // Username does not exist, log error & redirect back
        if (!users){
            var profile = {
                            email      : req.body.email,
                            first_name : req.body.firstname,
                            last_name  : req.body.lastname,
                            password   : req.body.password,
                            date       : new Date()
                          };
          
          var users = mongoose.model('user',User);

          users(profile)
            .save(function(err, doc){
              if(err) res.status(401).send(err);
              else{ 
                console.log("success");
                data = { 
                  id_token: createToken(profile),
                  username: req.body.firstname
                   };
                res.status(201).send(data);
              }
            });
        }
        else{
           res.status(401).send('Email-ID already exist');
        }
    });
  }
});


app.post('/login', function(req, res) {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send("You must enter the Email and the password");
  }

  users.findOne({ 'email' :  req.body.email }, 
      function(err, users) {
        // In case of any error, return using the done method
        if (err)
          return res.json(err);

            if (!users) {
              return res.status(401).send("The Email or password don't match");
            }

            if (users.password !== req.body.password) {
              return res.status(401).send("The Email or password don't match");
            }
             var profile = {
                            email      : users.email,
                            first_name : users.first_name,
                            last_name  : users.last_name,
                            password   : users.password
                          };
                data = { 
                  id_token: createToken(profile),
                  username: users.first_name
                   };
                res.status(201).send(data);
      });
});
