var router = require('express').Router(),
		_ 		 = require('underscore'),
		uuid 	 = require('uuid'),
		Albums = require('./albums_module'),
		Users  = require('./users_module');

//showing data for back navigation rendering
router.get(['/signup', '/login'], function(req, res, next) {
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

	Users.addUser(user);

	var username = {username: user.username}
	json_user = JSON.stringify(username);
//session
	res.json(username);
});

router.post("/login", function(req, res) {
	var user = req.body,
			user_info = Users.findUser(user) || {},
			username = { username: user_info.username };

	if (!Users.findUser(user)) {
		res.status(500).send("User not found").end();
		next();
	}

	if (req.body.password !== user_info.password) {
		res.status(500).send("Wrong password").end();
		next();
	}
	
	if (user_info.admin) {
		username.admin = user_info.admin;
	}

	//refactor
	username.cart = user_info.cart;

	req.session.user = username;
	console.log(req.session.user)
	console.log(username)
	res.json(username);
});

router.post("/logout", function(req, res) {
	var user = JSON.parse(req.body.user);
			users = Users.getUsers(),
	    match = _(users).findWhere({username: user.username}),
			items = JSON.parse(req.body.cart);

	if (match) {
		match.cart = items;
	};

	console.log(user)
	// console.log(users)
	console.log(match)
	// console.log(items)
	
	Users.writeData(users);
	req.session.destroy();
  res.sendStatus(200);
});

router.get('/checkout', function(req, res) {
	//add cart data when refresh
	res.render("index", {albums: Albums.get()});
});

module.exports = router;