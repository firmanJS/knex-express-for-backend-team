import { Router } from 'express';

interface RestInterface {
  routes(): void;
}

abstract class BaseRoutes implements RestInterface {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  abstract routes(): void;
}

export default BaseRoutes;
