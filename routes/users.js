var router = require('express').Router(),
		_ 		 = require('underscore'),
		uuid 	 = require('uuid'),
		Albums = require('./albums_module'),
		Users  = require('./users_module');

//fix back navigation rendering
router.get(['/signup', '/login'], function(req, res) {
  res.render('index', { albums: Albums.get() });
});

router.post('/signup', function(req, res, next) {
	var user = {
				id: uuid.v4(),
				username: req.body.username,
				password: req.body.password,
			};

	if (Users.findUser(user)) {
		res.status(500).send("Username already used").end();
		next();
	}

	res.locals.username = user.username;
	Users.writeTofile(user);
	res.json({username: user.username});
	

	// if (!Users.setUser(user)) {
	// 	res.send('not valid user')
	// } else if (Users.setUser(user)) {
	// 	// Users.writeTofile(user);
	// 	res.send('valid user');
	// } else {
	// 	res.send('error');
	// }

});

module.exports = router;