const createError = require('http-errors');
const express = require('express');
const cors = require('cors')
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongo = require('mongoose')

require('dotenv').config()

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/userRouter');
const teamRouter = require('./routes/teamRouter');
const loginRouter = require('./routes/login');
const prositRouter = require('./routes/prosit');
const keywordRouter = require('./routes/keywordRouter');
const kivaferkoiRouter = require('./routes/kivaferkoi');
const socketRouter = require('./routes/socket');

mongo.connect(process.env.MONGODB_LINK, {useNewUrlParser: true, useUnifiedTopology: true})
let db = mongo.connection;

db.on('error', console.error.bind(console, 'Erreur lors de la connexion'));
db.once('open', function () {
  console.log("Connexion à la base OK");
});


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
app.use('/team', teamRouter);
app.use('/login', loginRouter);
app.use('/kivaferkoi', kivaferkoiRouter);
app.use('/keywords', keywordRouter);

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

module.exports = app;
