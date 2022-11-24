const { HTTP, PAGE, LIMIT } = require('./constant')
const { lang } = require('../lang')

const notFoundHandler = (req, res) => {
  const message = `Route : ${req.url} ${lang.__('not.found')}.`
  const err = new Error(message)
  res.status(HTTP.OK).json({
    error: err.toString(),
    status: true,
    message,
  })
}

const removeFavicon = (req, res, next) => {
  if (req.url === '/favicon.ico') {
    res.writeHead(200, { 'Content-Type': 'image/x-icon' })
    res.end()
  } else {
    next()
  }
}

const errorHandler = (_error, res) => res.status(HTTP.OK).json({
  status: true,
  message: lang.__('error.invalid.syntax'),
  data: [],
})

const syntaxError = (err, req, res, next) => {
  const result = {
    status: true,
    message: `syntax error ${err}`,
    data: []
  }

  if (err instanceof SyntaxError) {
    res.status(HTTP.OK).send(result)
  } else {
    next()
  }

  if (process.env.NODE_ENV === 'development') {
    console.info(err.toString())
    res.status(HTTP.OK).send(result)
  } else {
    // sent to sentry or whatever
    console.info(err.toString())
    res.status(HTTP.OK).send(result)
  }
}

const paginationResponse = (req, res, rows) => {
  const limitPerPage = req.query?.limit || LIMIT
  const countTotal = Number(rows?.data?.data?.count) || +LIMIT
  res.status(HTTP.OK).json({
    message: lang.__('get.success'),
    status: true,
    data: rows?.data?.data?.result || [],
    _meta: {
      page: Number(req.query?.page) || +PAGE,
      limit_per_page: +limitPerPage,
      total_page: Math.ceil(countTotal / limitPerPage),
      count_per_page: rows?.data?.response?.result?.length || 0,
      count_total: countTotal
    }
  })
}

const originResponse = (res, status, data) => {
  let code
  switch (status) {
    case 'success':
      code = HTTP.OK
      break
    case 'created':
      code = HTTP.OK
      break
    case 'not found':
      code = HTTP.OK
      break
    case 'unauthorized':
      code = HTTP.OK
      break
    default:
      code = HTTP.OK
  }
  res.status(code).json(data)
}

const baseResponse = (res, data) => res.status(data?.code ?? HTTP.OK).json(data?.data)

const mappingSuccessPagination = (message, response = [], code = HTTP.OK, status = true) => ({
  code,
  data: {
    status,
    message,
    response
  }
})

const mappingSuccess = (message, data = [], code = HTTP.OK, status = true) => ({
  code,
  data: {
    status,
    message,
    data
  }
})

const mappingError = (req, error, code = HTTP.BAD_REQUEST) => {
  let { message, exception } = ['', '']
  const manipulate = error.toString().split(':')
  switch (manipulate[0]) {
    case 'JsonWebTokenError':
      message = error
      break
    case 'Error':
      message = lang.__('error.db.connection')
      code = HTTP.BAD_REQUEST
      break
    case 'error':
      message = lang.__('error.db')
      break
    case 'TypeError':
      message = `error in code ${manipulate.toString()}`
      break
    case 'AggregateError':
      message = lang.__('error.db.query')
      break
    case 'MongoServerError':
      message = manipulate.toString()
      break
    case 'ReferenceError':
      message = manipulate.toString()
      break
    default:
      message = error
  }
  console.error(`catch message ${error}`);
  if (process.env.NODE_ENV === 'development') {
    exception = error.toString()
  }
  if (error?.type_error !== 'validation') {
    // sent alert
    console.info('sent alert', error)
  }
  return {
    code,
    data: {
      status: false,
      message,
      exception,
      data: []
    }
  }
}

module.exports = {
  notFoundHandler,
  errorHandler,
  baseResponse,
  paginationResponse,
  removeFavicon,
  syntaxError,
  originResponse,
  mappingSuccess,
  mappingError,
  mappingSuccessPagination
}
