/*
 * File         :   app.js
 * Description  :   Express server app configuration.
 * -------------------------------------------------------------------------------------------------------------------------------------- */
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

const errorHandlers = require('./middleware/errors/index');

const app = express();
const isDevelopment = app.get('env') === 'development';

app.use(cors({
  exposedHeaders: ['Content-Type', 'Authorization']
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

require('./routes/index')(app);

// error handlers
app.use(errorHandlers.errorMapperHandler); // translate error types into http error types
app.use(errorHandlers.errorHeaderHandler); // handles known error types
app.use(errorHandlers.typedErrorHandler); // handles known error types
app.use(errorHandlers.pageNotFound); // catch 404 and forward to error handler
app.use(isDevelopment ? errorHandlers.development : errorHandlers.production);

module.exports = app;
