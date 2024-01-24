import { EntityContract } from '../../interface/entity.interface';

export interface BlogPost extends EntityContract.LogInterface {
  name?: string;
  description?: string;
}

export interface BlogInterface extends EntityContract.LogInterface {
  readonly id?: string;
  readonly name?: string;
  readonly description?: string;
}
