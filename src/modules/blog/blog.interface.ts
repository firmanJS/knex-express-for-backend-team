import { LogInterface } from '../../interface/entity.interface';

export interface BlogPost extends LogInterface {
  name?: string;
  description?: string;
}

export interface BlogInterface extends LogInterface {
  readonly id?: string;
  readonly name?: string;
  readonly description?: string;
}
