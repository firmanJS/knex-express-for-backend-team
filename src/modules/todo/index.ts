import { validateRequestBody } from '../../middleware/validation'
import BaseRest from '../../route/base'
import TodoHandler from './todo_handler'
import { postValidation } from './todo_validation'

class TodoRoutes extends BaseRest {
  public routes(): void {
    this.router.post('/', validateRequestBody(postValidation), TodoHandler.store)
    this.router.get('/', TodoHandler.fetch)
    this.router.get('/:id', TodoHandler.fetchByParam)
  }
}

export default new TodoRoutes().router
