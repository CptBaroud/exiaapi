const createError = require('http-errors');
const express = require('express');
const cors = require('cors')
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const prositRouter = require('./routes/prosit');
const kivaferkoiRouter = require('./routes/kivaferkoi');
const socketRouter = require('./routes/socket');

const app = express();
app.io = require('socket.io')()


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/testSocketExia', socketRouter)
app.use('/prosit', prositRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/kivaferkoi', kivaferkoiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.header("Access-Control-Allow-Origin", "http://localhost:8000/"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next()

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

console.log('Server start')

module.exports = app;
