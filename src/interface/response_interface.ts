export interface ResponseInterface {
  status: boolean;
  message: string;
  exception?: string;
  data: any | [];
}
interface MetaInterface {
  page: number;
  limit_per_page: number;
  total_page: number;
  count_per_page: number;
  count_total: number;
}

export interface WithMetaInterface extends ResponseInterface {
  link?: string;
  meta?: MetaInterface;
}

export interface DtoInterface {
  code?: number;
  data?: ResponseInterface;
}

export interface OptionsInterface {
  status: boolean;
  message: string;
  code?: number;
}
