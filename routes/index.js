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
  // if (req.session.user) {
  //   var user = req.session.user;
  // }
  var user;
  if (localStorage.getItem("user")) {
    user = localStorage.getItem("user");
  };

  console.log(user)
  res.render('index', { albums: Albums.get(), user: user });
});

module.exports = router;