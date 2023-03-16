import BaseRest from '../../route/base'
import TodoHandler from './todo_handler'
import { postValidation } from './todo_validation'

class TodoRoutes extends BaseRest {
  public routes(): void {
    this.router.post('/', postValidation, TodoHandler.store)
  }
}

export default new TodoRoutes().router
