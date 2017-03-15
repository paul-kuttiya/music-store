var router = require('express').Router(),
		_ 		 = require('underscore'),
		uuid 	 = require('uuid'),
		Albums = require('./albums_module'),
		Users  = require('./users_module');

//fix back navigation rendering
router.get(['/signup', '/login'], function(req, res) {
  res.render('form', { albums: Albums.get() });
});

router.post('/signup', function(req, res, next) {
	var user = {
				id: uuid.v4(),
				email: req.body.email,
				password: req.body.password,
			};

	// if (Users.checkUser(user) === false) {
	// 	res.send("not valid user");
	// } else if (Users.checkUser(user) === true) {
	// 	Users.writeTofile(user);
	// 	res.send(200);
	// };

	if (Users.checkUser(user)) {
		res.send("invalid user").end();
		next();
	}

	Users.writeTofile(user);
	res.send(user.email);
	

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