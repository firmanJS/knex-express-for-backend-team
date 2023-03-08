import { Http } from "./enum"
import { Request, Response, NextFunction } from 'express'
import { ResponseInterface } from "../interface/response_interface"

export const notFoundHandler = (req: Request, res: Response): Response => {
  const message = `Route : ${req.url} ${lang.__('notfound')}.`
  const err: any = new Error(message)

  const result: ResponseInterface = {
    data: err.toString(),
    status: false,
    message,
  }

  return res.status(Http.NOT_FOUND).json(result)
}

export const removeFavicon = (req: Request, res: Response, next:NextFunction): void => {
  if (req.url === '/favicon.ico') {
    res.writeHead(200, { 'Content-Type': 'image/x-icon' })
    res.end()
  } else {
    next()
  }
}

export const errorHandler = (req: Request, res: Response): Response => {
  const result: ResponseInterface = {
    data: [],
    status: false,
    message: lang.__('error.invalid.syntax'),
  }

  return res.status(Http.NOT_FOUND).json(result)
}

export const syntaxError = (err:any, req, res, next): void => {
  const result = {
    status: true,
    message: `syntax error ${err}`,
    data: []
  }

  if (err instanceof SyntaxError) {
    res.status(Http.OK).send(result)
  } else {
    next()
  }

  if (process.env.NODE_ENV === 'development') {
    console.info(err.toString())
    res.status(Http.OK).send(result)
  } else {
    // sent to sentry or whatever
    console.info(err.toString())
    res.status(Http.OK).send(result)
  }
}

export const paginationResponse = (req, res, rows) => {
  const options = { status: true, message: lang.__('get.success'), code: Http.OK }
  let { status, message, code } = options
  if (Number(rows?.data?.data?.count) === 0) {
    status = false
    message = lang.__('notfound')
    code = Http.NOT_FOUND
  }
  const limitPerPage = req.query?.limit || LIMIT
  const countTotal = Number(rows?.data?.data?.count) || +LIMIT
  res.status(code).json({
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
  })
}

export const originResponse = (res, status, data) => {
  let code
  switch (status) {
    case 'success':
      code = Http.OK
      break
    case 'created':
      code = Http.OK
      break
    case 'not found':
      code = Http.OK
      break
    case 'unauthorized':
      code = Http.OK
      break
    default:
      code = Http.OK
  }
  res.status(code).json(data)
}

export const baseResponse = (res, data) => res.status(data?.code ?? Http.OK).json(data?.data)

export const mappingSuccess = (message, data = [], code = Http.OK, status = true) => ({
  code,
  data: {
    status,
    message,
    data
  }
})

const conditionCheck = (error, manipulate, message) => {
  switch (manipulate[0]) {
    case 'JsonWebTokenError':
      message = error
      break
    case 'Error':
      message = lang.__('error.db.connection')
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

  return message
}

export const mappingError = (req:Request, error: any, code: number = Http.BAD_REQUEST): ErrorInterface => {
  let { message, exception } = ['', '']
  const manipulate = error.toString().split(':')
  console.error(`catch message ${error}`);
  message = lang.__('error.db.transaction')
  if (process.env.NODE_ENV === 'development') {
    exception = error.toString()
    message = conditionCheck(error, manipulate, message)
  }
  if (error?.type_error !== 'validation') {
    // sent alert
    console.info('sent alert', error, req)
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

export const captureLog = (err:any): void => {
  if (process.env.NODE_ENV === 'development') {
    console.info('error validateMiddleware', err);
  }
}
