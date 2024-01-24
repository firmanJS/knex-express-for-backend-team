import { EntityContract } from '../../interface/entity.interface';

export interface BlogCategoryPost extends EntityContract.LogInterface {
  name?: string;
  description?: string;
}

export interface BlogCategoryInterface extends EntityContract.LogInterface {
  readonly id?: string;
  readonly name?: string;
  readonly description?: string;
}
