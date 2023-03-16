import BaseRest from '../base'
import HealthRest from '../health'
import TodoRoutes from '../../modules/todo'

// const tagVersionOne : string = '/api/v1'

class Rest extends BaseRest {
  public routes(): void {
    this.router.use(HealthRest)
    this.router.use('/api/v1/todo',TodoRoutes)
    // this.router.use(`${tagVersionOne}`)
  }
}

export default new Rest().router
