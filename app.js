var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    stylus = require('stylus'),
    nib = require('nib'),
    bodyParser = require('body-parser');

//require route module for routes
var index = require('./routes/index'),
    albums = require('./routes/albums'),
    users = require('./routes/users');

//create app instance to store info for express app
var app = express();

//set view path lookup
// app.set('views', path.join(__dirname, 'views'));

//set view path lookup dynamic way, look into views in basedir
app.locals.basedir = app.get('views');
// view engine setup
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

//use stylus middleware for app
app.use(stylus.middleware({
  src: path.join(__dirname, "public"),
  compile: function(str, path) {
    return stylus(str).set("filename", path).use(nib());
  }
}));

app.use(logger('dev'));

//use bodyParser json and urlencoded for post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(function (req, res, next) {
  // check if client sent cookie
  var cookie = req.cookies.user;

  if (cookie === undefined) {
    // no: set a new cookie
    res.cookie('user', '', { maxAge: 518400000, httpOnly: true });
  }

  next();
});

//find static path for html and css at public folder
app.use(express.static(path.join(__dirname, 'public')));

//register index route as middleware for app
app.use('/', index);
//register albums route as middleware for app
//prepath is /albums
app.use('/albums', albums);
app.use('/users', users);

//predefined path "/users/" imported from users.js as middleware
// app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;