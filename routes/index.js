var express = require('express'),
    router = express.Router(),
    Albums = require('./albums_module');
// var fs = require('fs'),
//     path = require('path');

//     var project_path = path.dirname(__dirname),
//     file_path = path.resolve(project_path, "data/albums.json"),
//     albums = fs.readFileSync(file_path);

// function get() {
//   return JSON.parse(albums).data;
// };

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { albums: Albums.get() });
});

module.exports = router;