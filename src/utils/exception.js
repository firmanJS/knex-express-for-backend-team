// const { captureLog } = require('express-logger-logique')
const { HTTP, PAGE, LIMIT, ENVIRONMENT } = require('./constant');
const { lang } = require('../lang');
const { customFormat } = require('./date');
const { APP_DEBUG, APP_ENV } = require('../config');
// const { todayFormat } = require('./date')
const debugMode = (req) => {
  if (+APP_DEBUG === 1) {
    console.info(`=========== Incoming Request ${customFormat()} ===========`);
    if ([ENVIRONMENT.LOC, ENVIRONMENT.DEV, ENVIRONMENT.STG].includes(APP_ENV)) {
      console.info('Headers:', req?.headers);
    }
    console.info('Query:', JSON.stringify(req?.query));
    console.info('Param:', JSON.stringify(req?.params));
    console.info('Body:', JSON.stringify(req?.body));
  }
};

exports.notFoundHandler = (req, res) => {
  const message = `Route : ${req.url} ${lang.__('notfound')}.`;
  const err = new Error(message);
  res.status(HTTP.OK).json({
    error: err.toString(),
    status: true,
    message
  });
};

exports.removeFavicon = (req, res, next) => {
  if (req.url === '/favicon.ico') {
    res.writeHead(200, { 'Content-Type': 'image/x-icon' });
    res.end();
  } else {
    next();
  }
};

exports.errorHandler = (_error, res) =>
  res.status(HTTP.OK).json({
    status: true,
    message: lang.__('error.invalid.syntax'),
    data: []
  });

exports.syntaxError = (err, req, res, next) => {
  const result = {
    status: true,
    message: `syntax error ${err}`,
    data: []
  };

  if (err instanceof SyntaxError) {
    res.status(HTTP.OK).send(result);
  } else {
    next();
  }

  if (APP_ENV === ENVIRONMENT.DEV) {
    console.info(err.toString());
    res.status(HTTP.OK).send(result);
  } else {
    // sent to sentry or whatever
    console.info(err.toString());
    res.status(HTTP.OK).send(result);
  }
};

exports.paginationResponse = (req, res, rows) => {
  debugMode(req);
  const options = {
    status: true,
    message: lang.__('get.success'),
    code: HTTP.OK
  };
  let { status, message, code } = options;
  if (Number(rows?.data?.data?.count) === 0) {
    status = false;
    message = lang.__('notfound');
    code = HTTP.NOT_FOUND;
  }
  const limitPerPage = req.query?.limit || LIMIT;
  const countTotal = Number(rows?.data?.data?.count) || +LIMIT;
  return res.status(code).json({
    message,
    status,
    data: rows?.data?.data?.result || [],
    _meta: {
      page: Number(req.query?.page) || +PAGE,
      limit_per_page: +limitPerPage,
      total_page: Math.ceil(countTotal / limitPerPage),
      count_per_page: rows?.data?.response?.result?.length || 0,
      count_total: countTotal
    }
  });
};

exports.originResponse = (req, res, status, data) => {
  debugMode(req);
  let code;
  switch (status) {
    case 'success':
      code = HTTP.OK;
      break;
    case 'created':
      code = HTTP.CREATED;
      break;
    case 'not found':
      code = HTTP.NOT_FOUND;
      break;
    case 'unauthorized':
      code = HTTP.UNAUTHORIZED;
      break;
    default:
      code = HTTP.OK;
  }
  return res.status(code).json(data);
};

exports.baseResponse = (req, res, data) => {
  debugMode(req);
  return res.status(data?.code ?? HTTP.OK).json(data?.data);
};

exports.mappingSuccess = (
  message,
  data = [],
  code = HTTP.OK,
  status = true
) => ({
  code,
  data: {
    status,
    message,
    data
  }
});

const conditionCheck = (error, manipulate, message) => {
  switch (manipulate[0]) {
    case 'JsonWebTokenError':
      message = error?.message ?? error;
      break;
    case 'TokenExpiredError':
      message = error?.message ?? error;
      break;
    case 'Error':
      message = lang.__('error.db.connection');
      break;
    case 'TypeError':
      message = `error in code ${manipulate.toString()}`;
      break;
    case 'AggregateError':
      message = lang.__('error.db.query');
      break;
    case 'MongoServerError':
      message = manipulate.toString();
      break;
    case 'ReferenceError':
      message = manipulate.toString();
      break;
    default:
      message = error;
  }

  return message;
};

exports.mappingError = (req, error, code = HTTP.BAD_REQUEST) => {
  let message = '';
  let exception = '';
  const manipulate = error.toString().split(':');
  console.error(`catch message ${error}`);
  message = lang.__('error.db.transaction');
  if (APP_ENV === ENVIRONMENT.DEV) {
    exception = error.toString();
    message = conditionCheck(error, manipulate, message);
  }
  if (error?.type_error !== 'validation') {
    // sent alert
    // const msg = `\n ${todayFormat()} - ${error.toString()}`
    // captureLog({ type: 'transactions', file_name: 'transaction.log' }).write(msg)
    console.info('sent alert', error);
  }
  return {
    code,
    data: {
      status: false,
      message,
      exception,
      data: []
    }
  };
};

exports.captureLog = (err) => {
  if ([ENVIRONMENT.LOC, ENVIRONMENT.DEV, ENVIRONMENT.STG].includes(APP_ENV)) {
    console.info('error validateMiddleware', err);
  }
};
