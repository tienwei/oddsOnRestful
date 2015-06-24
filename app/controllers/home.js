var express = require('express'),
  router    = express.Router(),
  Users     = require('../models/user.js'),
  Fuse      = require('../../public/js/fuse.min.js'),
  Firebase  = require('firebase');

module.exports = function (app) {
  app.use('/', router);
  app.use(require('express-promise')());
};

// variables
var users = [],
initilCall = true;
usersRef = new Firebase('https://torid-heat-6127.firebaseio.com/users');

// initially load all the users
usersRef.once('value', function(usersObject) {
  users = Object.keys(usersObject.val())
    .map(function(userObj) {
      return usersObject.val()[userObj];
    });
});

// when a new user is created, add them to the user array
usersRef.on('child_added', function(newUser) {
  console.log('child_added worked');
  if(!initilCall) {
    console.log('pushed newUser');
    users.push(newUser.val());
  }
  initilCall = false;
});

router.get('/users', function(req, res, next) {
  var options = {
    keys: ['name'],
    shouldSort: true,
    threshold: 0.4
  };
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  var keyword = req.param('name');
  var f       = new Fuse(users, options);
  var result  = f.search(keyword);
  res.json(result);
});
