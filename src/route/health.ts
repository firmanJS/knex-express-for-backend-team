import { Request, Response } from 'express'
import swaggerUi from 'swagger-ui-express'
import config from '../config'
import BaseRest from './base'
import { Environment } from '../utils/enum'
import { swaggerInit } from '../static'

const getDurationInMilliseconds = (start = process.hrtime()) => {
  const NS_PER_SEC = 1e9
  const NS_TO_MS = 1e6
  const diff = process.hrtime(start)

  return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS
}

class HealthRest extends BaseRest {
  public routes(): void {
    this.router.get('/', async (req: Request, res:Response): Promise<Response> => res.json({
      status: true,
      message: `Welcome to api ${config?.app?.name}`,
      data: {
        response_time: `${getDurationInMilliseconds()}(ms)`,
        uptimes: process.uptime(),
        timestamp: new Date().toISOString(),
        documentation: `http://${req.get('host')}/documentation`
      }
    }))

    if (config?.app?.env === Environment.DEV) {
      this.router.use('/documentation', swaggerUi.serve)
      this.router.get('/documentation', swaggerUi.setup(swaggerInit, { isExplorer: false }))
    }
  }
}

export default new HealthRest().router
