import compression from 'compression'
import cors from 'cors'
import 'dotenv/config'
import express, { Application } from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import config from './config'
import RestHttp from './route/V1'
import utils from './utils'

class App {
  public app: Application

  constructor() {
    this.app = express()
    this.plugins()
    this.routes()
  }

  protected plugins(): void {
    this.app.use(helmet.hidePoweredBy())
    this.app.use(helmet())
    this.app.use((_req, res, next) => {
      res.setHeader('Permissions-Policy', config?.app?.permission_policy)
      res.setHeader('X-XSS-Protection', config?.app?.protetcion)
      next()
    })
    this.app.use(cors({
      methods: config?.app?.method,
      allowedHeaders: config?.app?.allow_header,
      exposedHeaders: config?.app?.expose_header
    })) // cors setup
    this.app.use(cors())
    this.app.use(compression()) // gzip compression
    this.app.use(express.json({ limit: config?.app?.limit })) // json limit
    if (config?.app?.env === utils?.Environment.PROD) {
      this.app.use(morgan(utils?.MORGAN_FORMAT.PROD_FORMAT))
    } else {
      this.app.use(morgan(utils?.MORGAN_FORMAT.DEV_FORMAT, { stream: process.stderr }))
    }
  }

  protected routes(): void {
    this.app.use(utils?.removeFavicon)
    this.app.use(RestHttp)
    this.app.use(utils?.notFoundHandler)
    this.app.use(utils?.syntaxError)
    this.app.use(utils?.errorHandler)
  }
}

const { app } = new App()

export default app
