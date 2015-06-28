var restful = require('node-restful'),
    express = require('express'),
    _       = require('lodash'),
    config  = require('../config'),
    jwt     = require('jsonwebtoken');

module.exports = function(app, route) {

  // Setup the controller for REST.
  var rest = restful.model(
    'users',
    app.models.users
  ).methods(['get', 'put', 'post', 'delete']);

 /*rest.after('get', function(req, res, next) {
   
    var user = res.locals.bundle;
    if (user.password !== req.body.password) {
      console.log("error");
      return res.status(401).send("The Email or password don't match");
    }

    res.bundle = createToken(user);
    next();
  });

function createToken(user) {
  return jwt.sign(_.omit(user, 'password'), config.secret, { expiresInMinutes: 60*0.5 });
}
*/
  // Register this endpoint with the application.
  rest.register(app, route);

  // Return middleware.
  return function(req, res, next) {
    next();
  };
};