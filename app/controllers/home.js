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
usersRef  = new Firebase('https://torid-heat-6127.firebaseio.com/users');

// when a new user is created, add them to the user array
usersRef.on('child_added', function(user) {
  console.log('pushed newUser');
  users.push(user.val());
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
