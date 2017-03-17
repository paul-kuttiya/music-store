var router = require('express').Router(),
		_ 		 = require('underscore'),
		uuid 	 = require('uuid'),
		Albums = require('./albums_module'),
		Users  = require('./users_module');

//fix back navigation rendering
router.get(['/signup', '/login',], function(req, res, next) {
  res.render('index', { albums: Albums.get() });
});

router.post('/signup', function(req, res, next) {
	var user = {
				id: uuid.v4(),
				username: req.body.username,
				password: req.body.password,
			};
	
	var json;

	if (Users.findUser(user)) {
		res.status(500).send("Username already used").end();
		next();
	}

	Users.writeTofile(user);

	var username = {username: user.username}
	json_user = JSON.stringify(username);
	localStorage.setItem("user", json_user);
	res.json(username);
});

router.post("/login", function(req, res) {
	var user = req.body,
			user_info = Users.findUser(user),
			username ={ username: user_info.username }


	if (!Users.findUser(user)) {
		res.status(500).send("User not found").end();
		next();
	}
	
	if (user_info.admin) {
		username.admin = user_info.admin;
	}

	json_user = JSON.stringify(username);
	localStorage.setItem("user", json_user);
	res.json(username);
});

router.post("/logout", function(req, res) {
	localStorage.clear();
	// console.log(localStorage.user)
  res.sendStatus(200).end();
});

module.exports = router;