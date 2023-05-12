import { tokenValidation } from '../../middleware/auth';
import AuthRoutes from '../../modules/auth';
import BlogCategoryRoutes from '../../modules/blog_category';
import TodoRoutes from '../../modules/todo';
import BaseRest from '../base';
import HealthRest from '../health';

// const tagVersionOne : string = '/api/v1'

class Rest extends BaseRest {
  public routes(): void {
    this.router.use(HealthRest);
    this.router.use('/api/v1/auth', AuthRoutes);
    this.router.use('/api/v1/blog-category', BlogCategoryRoutes);
    this.router.use('/api/v1/todo', tokenValidation, TodoRoutes);
  }
}

export default new Rest().router;
