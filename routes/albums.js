var router = require('express').Router(),
		_ 		 = require('underscore'),
		Albums = require('./albums_module');

router.get('/new', function(req, res) {
	//set for refresh & add collection for browser 'back' button
	//to render indexView
	res.render('index', {albums: Albums.get()});
});

router.get('/', function(req, res) {
	res.json(Albums.get());
});

router.post("/", function(req, res) {
	var albums = Albums.get(),
			new_album = req.body;
			last_id = Albums.getLastId();

	new_album.id = last_id;
	albums.push(new_album);
	Albums.set(albums, last_id);
	res.json(albums);
});

//edit
router.get("/edit/:id", function(req, res) {
	var edit_model = _.findWhere(Albums.get(), { id: req.params.id });
	res.render('index', {albums: Albums.get()});
});

router.put("/edit/:id", function(req, res) {
	var updated_album = req.body,
			albums = Albums.get();
			
	//modify data collection
	//pass by reference --> will update albums obj
	albums.forEach(function(album) {
		if (+album.id === +updated_album.id) {
			updated_album.id = +req.params.id,
			_.extend(album, updated_album);
		}
	});

	//database
	Albums.set(albums);
	res.send(200).end();
});

router.delete("/delete/:id", function(req, res) {
	var delete_id = +req.params.id,
			albums = _.reject(Albums.get(), function(album) {
				return album.id === delete_id;
			});

	Albums.set(albums);
	res.send(200).end();
});

module.exports = router;