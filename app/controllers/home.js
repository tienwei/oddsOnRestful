var express = require('express'),
  router = express.Router(),
  Users = require('../models/user.js'),
  Fuse = require('../../public/js/fuse.min.js'),
  Firebase = require('firebase');

module.exports = function (app) {
  app.use('/', router);
  app.use(require('express-promise')());
};

router.get('/users', function (req, res, next) {
    var options = {
      keys: ['name']   // keys to search in
    }
    var keyword = req.param('name'); 
    var myFirebaseRef = new Firebase("https://torid-heat-6127.firebaseio.com/users");
    myFirebaseRef.on('value' ,function(snapshot) {
      var users = Object.keys(snapshot.val()).map(function(k) { return snapshot.val()[k] });
      var f = new Fuse(users, options);
      var result = f.search(keyword);
      res.json(result);
    });
    
});


