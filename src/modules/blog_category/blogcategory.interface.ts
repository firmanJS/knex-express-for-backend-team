import { LogInterface } from '../../interface/entity.interface';

export interface BlogCategoryPost extends LogInterface {
  name?: string;
  description?: string;
}

export interface BlogCategoryInterface extends LogInterface {
  readonly id?: string;
  readonly name?: string;
  readonly description?: string;
}
