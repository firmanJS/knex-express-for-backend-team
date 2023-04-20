import { NextFunction, Request, Response } from 'express'
import config from '../config'
import {
  DtoInterface, OptionsInterface, ResponseInterface, WithMetaInterface
} from '../interface/response_interface'
import Translate from '../lang'
import {
  Environment,
  Http,
  LIMIT, PAGE
} from './constant'

namespace Exception {
const optionCustom = () :OptionsInterface => {
  const data: OptionsInterface = {
    status: true,
    message: Translate.__('get.success'),
  }

  return data
}

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

export const removeFavicon = (req: Request, res: Response, next:NextFunction): void => {
  if (req.url === '/favicon.ico') {
    res.writeHead(Http.OK, { 'Content-Type': 'image/x-icon' })
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

  return res.status(Http.BAD_REQUEST).json(result)
}

export const syntaxError = (err:any, req: Request, res: Response, next:NextFunction): Response => {
  const result: ResponseInterface = {
    status: true,
    message: `syntax error ${err}`,
    data: []
  }

  if (err instanceof SyntaxError) {
    result.status = false
    return res.status(Http.BAD_REQUEST).send(result)
  }
  next()

  if (process.env.NODE_ENV === 'development') {
    console.info(err.toString())
    return res.status(Http.OK).send(result)
  }
  // sent to sentry or whatever
  console.info(err.toString())
  return res.status(Http.OK).send(result)
}

const logicPagination = (rows: any, totalData: number) => {
  let code: number = rows?.code || Http.OK
  const options: OptionsInterface = optionCustom()
  let { status, message } = options
  if (totalData === 0) {
    status = false
    message = Translate.__('notfound')
    code = Http.NOT_FOUND
  }

  if (rows?.code === Http.BAD_REQUEST) {
    status = false
    message = rows?.data?.exception
    code = Http.BAD_REQUEST
  }

  return {
    status,
    code,
    message
  }
}

export const paginationResponse = (req: Request, res: Response, rows:any): Response => {
  const totalData: number = Number(rows?.data?.data?.count) ?? 0
  const { status, message, code } = logicPagination(rows, totalData)
  const limitPerPage: number = Number(req.query?.limit) || +LIMIT
  const countTotal: number = totalData || +LIMIT
  const result: WithMetaInterface = {
    message,
    status,
    data: rows?.data?.data?.result || [],
    meta: {
      page: Number(req.query?.page) || +PAGE,
      limit_per_page: +limitPerPage,
      total_page: Math.ceil(countTotal / limitPerPage),
      count_per_page: rows?.data?.response?.result?.length || 0,
      count_total: countTotal
    }
  }
  return res.status(code).json(result)
}

export const baseResponse = (res: Response, data: any)
: Response => res.status(data?.code ?? Http.OK).json(data?.data)

export const mappingSuccess = (
  message: string,
  data:[] | {} = [],
  code: number = Http.OK,
  status:boolean = true
)
: DtoInterface => ({
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

export const mappingError = (req:Request, error: any, code: number = Http.BAD_REQUEST)
: DtoInterface => {
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
}

export = Exception
