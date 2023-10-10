const express = require('express');

const app = express();
const helmet = require('helmet');
const {
  notFoundHandler,
  errorHandler,
  removeFavicon,
  syntaxError,
  useGzip
} = require('./utils');

const healthCheck = require('./routes');
const apiV1 = require('./routes/V1');
const { setLanguage, extraHeaders, corsSetup, logger } = require('./utils');
const { APP_LIMIT } = require('./config');

app.use(setLanguage); // set language api response
app.use(useGzip()); // gzip compression
app.set('trust proxy', 1); // for real ip
app.use(helmet.hidePoweredBy()); // hide powered by headers
app.use(helmet.frameguard()); // frameguard headers
app.use(helmet.xContentTypeOptions()); // content hedares
app.use(helmet.referrerPolicy()); // referer policy headers
app.use(extraHeaders); // extra headers config
app.use(corsSetup()); // cors setup
app.use(logger()); // logger morgan
app.use(express.json({ limit: APP_LIMIT })); // json limit
app.use(healthCheck); // routing
app.use(apiV1); // routing
app.use('/public', express.static('public')); // for public folder
app.use(notFoundHandler); // 404 handler
app.use(errorHandler); // error handlerr
app.use(syntaxError); // error handlerr syntax
app.use(removeFavicon);
module.exports = app;
