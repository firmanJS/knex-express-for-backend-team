import { NextFunction, Request, Response } from 'express';
import config from '../config';
import {
  DtoInterface,
  OptionsInterface,
  ResponseInterface,
  WithMetaInterface
} from '../interface/response.interface';
import Translate from '../lang';
import { Environment, Http, LIMIT, PAGE } from './constant';

import Dates from './date';

namespace Exception {
  const optionCustom = (): OptionsInterface => {
    const data: OptionsInterface = {
      status: true,
      message: Translate.__('get.success')
    };

    return data;
  };

  const debugRequest = (req: Request) => {
    const ALLOWED_LOG = ['local', 'development'];
    if (config.app.debug === 1) {
      console.log(
        `=========== Incoming Request ${Dates.todayFormat()} ===========`
      );
      if (ALLOWED_LOG.includes(config.app.env)) {
        console.log('Headers:', req?.headers);
      }
      if (config.app.env === Environment.PROD) {
        delete req?.body?.password;
      }
      console.log('Query:', JSON.stringify(req?.query));
      console.log('Param:', JSON.stringify(req?.params));
      console.log('Body:', JSON.stringify(req?.body));
    }
  };

  export const notFoundHandler = (req: Request, res: Response): Response => {
    const message = `Route : ${req.url} ${Translate.__('notfound')}.`;
    const err: any = new Error(message);

    const result: ResponseInterface = {
      data: err.toString(),
      status: false,
      message
    };
    debugRequest(req);
    return res.status(Http.NOT_FOUND).json(result);
  };

  export const removeFavicon = (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    if (req.url === '/favicon.ico') {
      res.writeHead(Http.OK, { 'Content-Type': 'image/x-icon' });
      res.end();
    } else {
      next();
    }
  };

  export const errorHandler = (req: Request, res: Response): Response => {
    const result: ResponseInterface = {
      data: [],
      status: false,
      message: Translate.__('error.invalid.syntax')
    };
    debugRequest(req);
    return res.status(Http.BAD_REQUEST).json(result);
  };

  export const syntaxError = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
  ): Response => {
    const result: ResponseInterface = {
      status: true,
      message: `syntax error ${err}`,
      data: []
    };

    if (err instanceof SyntaxError) {
      result.status = false;
      return res.status(Http.BAD_REQUEST).send(result);
    }
    next();

    if (process.env.NODE_ENV === 'development') {
      console.log(err.toString());
      return res.status(Http.OK).send(result);
    }
    // sent to sentry or whatever
    console.log(err.toString());
    debugRequest(req);
    return res.status(Http.OK).send(result);
  };

  const logicPagination = (rows: any, totalData: number) => {
    let code: number = rows?.code || Http.OK;
    const options: OptionsInterface = optionCustom();
    let { status, message } = options;
    if (totalData === 0) {
      status = false;
      message = Translate.__('msg.notfound', { msg: 'Data' });
      code = Http.NOT_FOUND;
    }

    if (rows?.code === Http.BAD_REQUEST) {
      status = false;
      message = rows?.data?.exception;
      code = Http.BAD_REQUEST;
    }

    return {
      status,
      code,
      message
    };
  };

  export const paginationResponse = (
    req: Request,
    res: Response,
    rows: DtoInterface
  ): Response => {
    debugRequest(req);
    const totalData: number = Number(rows?.data?.data?.count) ?? 0;
    const { status, message, code } = logicPagination(rows, totalData);
    const limitPerPage: number = Number(req.query?.limit) || +LIMIT;
    const countTotal: number = totalData || +LIMIT;
    const result: WithMetaInterface = {
      message,
      status,
      data: rows?.data?.data?.result || [],
      meta: {
        page: Number(req.query?.page) || +PAGE,
        limit_per_page: +limitPerPage,
        total_page: Math.ceil(countTotal / limitPerPage),
        count_per_page: rows?.data?.data?.result?.length || 0,
        count_total: countTotal
      }
    };
    return res.status(code).json(result);
  };

  export const baseResponse = (
    req: Request,
    res: Response,
    data: DtoInterface
  ): Response => {
    debugRequest(req);
    return res.status(data?.code ?? Http.OK).json(data?.data);
  };

  export const mappingSuccess = (
    message: string,
    data: [] | {} = [],
    code: number = Http.OK,
    status: boolean = true
  ): DtoInterface => ({
    code,
    data: {
      status,
      message,
      data
    }
  });

  const conditionCheck = (
    error: string | any,
    manipulate: string
  ): string | any => {
    const msgList: string | Record<string, string> = {
      JsonWebTokenError: error?.message ?? error,
      TokenExpiredError: error?.message ?? error,
      Error: Translate.__('error.db.connection'),
      error: Translate.__('error.db'),
      TypeError: `error in code ${manipulate.toString()}`,
      AggregateError: Translate.__('error.db.query'),
      ReferenceError: manipulate.toString()
    };
    return msgList[manipulate] ?? error;
  };

  export const mappingError = (
    req: Request,
    error: any,
    code: number = Http.BAD_REQUEST
  ): DtoInterface => {
    let message: string = '';
    let exception: string = '';
    const manipulate: string = error.toString().split(':');
    console.log(`catch message ${JSON.stringify(error)}`);
    message = Translate.__('error.db.transaction');
    if (config?.app?.env === Environment.DEV) {
      exception = error;
      message = conditionCheck(error, manipulate[0]);
    }
    if (error?.type_error !== 'validation') {
      // sent alert
    }
    console.log(`request error ${req.originalUrl}`, error);
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
}

export = Exception;
