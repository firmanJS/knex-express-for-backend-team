const express = require('express');

require('dotenv').config();

const app = express();
const compress = require('compression');
const methodOverride = require('method-override');
const xss = require('xss-clean');
const morgan = require('morgan');
const {
  notFoundHandler,
  errorHandler,
  removeFavicon,
  MORGAN_FORMAT,
  syntaxError,
} = require('./utils');

const healthCheck = require('./routes');
const apiV1 = require('./routes/V1');

const limit = process.env.JSON_LIMIT.toString() ?? '12800kb';
app.use(compress()); // gzip compression
app.use(methodOverride()); // lets you use HTTP verbs
app.use(xss()); // handler xss attack
app.use(express.json({ limit })); // json limit
if (process.env.NODE_ENV === 'production') {
  app.use(morgan(MORGAN_FORMAT.PROD));
} else {
  app.use(morgan(MORGAN_FORMAT.DEV, { stream: process.stderr }));
}
app.use(healthCheck); // routing
app.use(apiV1); // routing
app.use('/public', express.static('public')); // for public folder
app.use(notFoundHandler); // 404 handler
app.use(errorHandler); // error handlerr
app.use(syntaxError); // error handlerr syntax
app.use(removeFavicon);

module.exports = app;
