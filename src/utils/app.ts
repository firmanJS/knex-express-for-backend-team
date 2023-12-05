import compression from 'compression';
import cors from 'cors';
import { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import config from '../config';
import Translate from '../lang';
import Constant from './constant';
import Dates from './date';

const shouldCompress = (req: Request, res: Response) => {
  if (req.headers['x-no-compression']) return false;
  return compression.filter(req, res);
};

export const useGzip = () =>
  compression({
    filter: shouldCompress,
    threshold: 0
  });

export const setLanguage = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req?.headers?.lang) {
    const local: string | any = req?.headers?.lang;
    Translate.setLocale(local);
  } else {
    Translate.setLocale(config.app.language);
    req.headers.lang = config.app.language;
  }
  next();
};

export const extraHeaders = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.setHeader('Permissions-Policy', config.app.permission_policy);
  res.setHeader('X-XSS-Protection', config.app.protetcion);
  res.setHeader('Content-Security-Policy', config.app.csp);
  next();
};

export const corsSetup = () =>
  cors({
    methods: config.app.method,
    allowedHeaders: config.app.allow_header,
    exposedHeaders: config.app.expose_header
  });

export const logger = () => {
  morgan.token('date', () => Dates.todayFormat());
  if (config.app.env === Constant.Environment.PROD) {
    return morgan(Constant.MORGAN_FORMAT.PROD_FORMAT);
  }
  return morgan(Constant.MORGAN_FORMAT.DEV_FORMAT, { stream: process.stderr });
};
