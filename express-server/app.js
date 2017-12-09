var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const passport = require('passport')
const mongoose = require('mongoose');
const index = require('./routes/index');
const profileRoutes = require('./routes/profile-routes');
const recipes = require('./routes/recipes');
const authRoutes = require('./routes/auth-routes');
const cors = require('cors');
const passportSetup = require('./configs/passport-setup');
const cookieSession = require('cookie-session')
const keys = require('./configs/keys');
require('./configs/database');

// const upload = require('./configs/multer');

var app = express();
app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieSession({
  maxAge: 24*60*60*1000,
  keys:[keys.session.cookieKey]
}))
//Initializing passport
app.use(passport.initialize());
app.use(passport.session());

app.use('/', index);
app.use('/profile', profileRoutes);
app.use('/auth', authRoutes);
app.use('/recipes', recipes);




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
