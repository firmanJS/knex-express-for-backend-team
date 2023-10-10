const cors = require('cors');
const morgan = require('morgan');
const {
  APP_LANGUAGE,
  APP_PERMISSION_POLICY,
  APP_PROTECTION,
  APP_CONTENT_POLICY,
  APP_METHOD,
  APP_ALLOW_HEADER,
  APP_EXPOSE_HEADER,
  APP_ENV
} = require('../config');
const { lang } = require('../lang');
const { MORGAN_FORMAT } = require('./constant');
const { customFormat } = require('./date');

exports.setLanguage = (req, res, next) => {
  if (req?.headers?.lang) {
    lang.setLocale(req.headers.lang);
  } else {
    lang.setLocale(APP_LANGUAGE);
    req.headers.lang = APP_LANGUAGE;
  }
  next();
};

exports.extraHeaders = (req, res, next) => {
  res.setHeader('Permissions-Policy', APP_PERMISSION_POLICY);
  res.setHeader('X-XSS-Protection', APP_PROTECTION);
  res.setHeader('Content-Security-Policy', APP_CONTENT_POLICY);
  next();
};

exports.corsSetup = () =>
  cors({
    methods: APP_METHOD,
    allowedHeaders: APP_ALLOW_HEADER,
    exposedHeaders: APP_EXPOSE_HEADER
  });

exports.logger = () => {
  morgan.token('date', () => customFormat());
  if (APP_ENV === 'production') {
    return morgan(MORGAN_FORMAT.PROD);
  }
  return morgan(MORGAN_FORMAT.DEV, { stream: process.stderr });
};
