const express = require('express');

const app = express();
const compression = require('compression');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const {
  notFoundHandler,
  errorHandler,
  removeFavicon,
  MORGAN_FORMAT,
  syntaxError,
  customFormat,
} = require('./utils');

const healthCheck = require('./routes');
const apiV1 = require('./routes/V1');
const {
  APP_ENV, APP_LIMIT, APP_METHOD, APP_EXPOSE_HEADER, APP_PERMISSION_POLICY, APP_PROTECTION,
  APP_ALLOW_HEADER, APP_LANGUAGE, APP_CONTENT_POLICY
} = require('./config');
const { lang } = require('./lang');

const shouldCompress = (req, res) => {
  if (req.headers['x-no-compression']) return false;
  return compression.filter(req, res);
};
app.use(compression({
  filter: shouldCompress,
  threshold: 0
}));
app.set('trust proxy', 1);
app.use((req, res, next) => {
  lang.setLocale(req?.query?.lang ?? APP_LANGUAGE);
  next();
});
app.use(helmet.hidePoweredBy());
app.use(helmet.frameguard());
app.use(helmet.xContentTypeOptions());
app.use(helmet.referrerPolicy());
app.use((_req, res, next) => {
  res.setHeader('Permissions-Policy', APP_PERMISSION_POLICY);
  res.setHeader('X-XSS-Protection', APP_PROTECTION);
  res.setHeader('Content-Security-Policy', APP_CONTENT_POLICY);
  next();
});
app.use(cors({
  methods: APP_METHOD,
  allowedHeaders: APP_ALLOW_HEADER,
  exposedHeaders: APP_EXPOSE_HEADER
})); // cors setup
app.use(express.json({ limit: APP_LIMIT })); // json limit
morgan.token('date', () => customFormat());// date logs
if (APP_ENV === 'production') {
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
