var router = require('express').Router(),
		_ 		 = require('underscore'),
		Albums = require('./albums_module');

router.get(['/signup', '/login'], function(req, res) {
  res.render('form', { albums: Albums.get() });
});

module.exports = router;