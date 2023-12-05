import 'dotenv/config';
import express, { Application } from 'express';
import helmet from 'helmet';
import config from './config';
import RestHttp from './route/V1';
import { Exception } from './utils';
import {
  corsSetup,
  extraHeaders,
  logger,
  setLanguage,
  useGzip
} from './utils/app';

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.plugins();
    this.routes();
  }

  protected plugins(): void {
    this.app.use(setLanguage); // set language api response
    this.app.use(useGzip()); // gzip compression
    this.app.set('trust proxy', 1); // for real ip
    this.app.use(helmet.hidePoweredBy()); // hide powered by headers
    this.app.use(helmet.frameguard()); // frameguard headers
    this.app.use(helmet.xContentTypeOptions()); // content hedares
    this.app.use(helmet.referrerPolicy()); // referer policy headers
    this.app.use(extraHeaders); // extra headers config
    this.app.use(corsSetup()); // cors setup
    this.app.use(logger()); // logger morgan
    this.app.use(express.json({ limit: config?.app?.limit })); // json limit
  }

  protected routes(): void {
    this.app.use(Exception.removeFavicon);
    this.app.use(RestHttp);
    this.app.use(Exception.notFoundHandler);
    this.app.use(Exception.syntaxError);
    this.app.use(Exception.errorHandler);
  }
}

const { app } = new App();

export default app;
