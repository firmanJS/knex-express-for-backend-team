import { LogInterface } from '../../interface/entity_interface';

export interface TodoPost extends LogInterface {
  name: string;
  description: string;
}

export interface TodoInterface extends LogInterface {
  readonly id?: string;
  readonly name?: string;
  readonly description?: string;
}