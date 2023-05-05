import { LogInterface } from '../../interface/entity_interface';

export interface BlogCategoryPost {
  name: string;
  description: string;
}

export interface BlogCategoryInterface extends LogInterface {
  readonly id?: string;
  readonly name?: string;
  readonly description?: string;
}
