import { Environment, Http } from './enum'
import { LIMIT, PAGE } from './constant'
import { Request, Response, NextFunction } from 'express'
import { DtoInterface, ResponseInterface } from '../interface/response_interface'
import Translate from '../lang'
import config from '../config'

export const notFoundHandler = (req: Request, res: Response): Response => {
  const message = `Route : ${req.url} ${Translate.__('notfound')}.`
  const err: any = new Error(message)

  const result: ResponseInterface = {
    data: err.toString(),
    status: false,
    message,
  }

  return res.status(Http.NOT_FOUND).json(result)
}

export const removeFavicon = (req: Request, res: Response, next:NextFunction) => {
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
    message: Translate.__('error.invalid.syntax'),
  }

  return res.status(Http.NOT_FOUND).json(result)
}

export const syntaxError = (err:any, req: Request, res: Response, next:NextFunction): void => {
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

export const paginationResponse = (req: Request, res: Response, rows:any): Response => {
  const options = {
    status: true,
    message: Translate.__('get.success'),
    code: Http.OK
  }
  let { status, message, code } = options
  if (Number(rows?.data?.data?.count) === 0) {
    status = false
    message = Translate.__('notfound')
    code = Http.NOT_FOUND
  }
  const limitPerPage: number = Number(req.query?.limit) || +LIMIT
  const countTotal: number = Number(rows?.data?.data?.count) || +LIMIT
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
  })
}

export const baseResponse = (res: Response, data: any): Response => res.status(data?.code ?? Http.OK).json(data?.data)

export const mappingSuccess = (message: string, data:[] = [], code = Http.OK, status = true): DtoInterface => ({
  code,
  data: {
    status,
    message,
    data
  }
})

const conditionCheck = (error:string, manipulate:string, message: string): string => {
  switch (manipulate[0]) {
    case 'JsonWebTokenError':
      message = error
      break
    case 'Error':
      message = Translate.__('error.db.connection')
      break
    case 'TypeError':
      message = `error in code ${manipulate.toString()}`
      break
    case 'AggregateError':
      message = Translate.__('error.db.query')
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

export const mappingError = (req:Request, error: any, code: number = Http.BAD_REQUEST): DtoInterface => {
  let message: string = ''
  let exception: string = ''
  const manipulate: string = error.toString().split(':')
  console.error(`catch message ${JSON.stringify(error)}`);
  message = Translate.__('error.db.transaction')
  if (config?.app?.env === Environment.DEV) {
    exception = error.toString()
    message = conditionCheck(error, manipulate, message)
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

export const captureLog = (err:any): void => {
  if (config?.app?.env === Environment.DEV) {
    console.info('error validateMiddleware', err);
  }
}
