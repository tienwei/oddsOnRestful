var express = require('express'),
  router = express.Router(),
  Users = require('../models/user.js');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/users', function (req, res, next) {
    // res.render('index', {
    //   title: 'Generator-Express MVC',
    //   articles: articles
    // });
    var users = new Users();
    res.json({
    	test: users.users,
      name: req.param('name'),
      max: req.param('max')
    });
});


