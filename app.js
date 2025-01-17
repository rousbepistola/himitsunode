var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var contactRouter = require('./routes/contact');
var aboutRouter = require('./routes/about');
var releaseRouter = require('./routes/release');
var signupRouter = require('./routes/signup');
var sendRouter = require('./routes/send');
var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout');
var secretsRouter = require('./routes/secrets');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret:'anything'}));
app.use(function(req,res,next){
  res.locals.session = req.session;
  next();
});
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/contact', contactRouter);
app.use('/about', aboutRouter);
app.use('/release', releaseRouter);
app.use('/signup', signupRouter);
app.use('/send', sendRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/secrets', secretsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
