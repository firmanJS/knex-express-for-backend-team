import { EntityContract } from '../../interface/entity.interface';

export interface TodoPost extends EntityContract.LogInterface {
  name?: string;
  description?: string;
}

export interface TodoInterface extends EntityContract.LogInterface {
  readonly id?: string;
  readonly name?: string;
  readonly description?: string;
}
