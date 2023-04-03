/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
export enum Environment {
  DEV = 'development',
  STG = 'staging',
  PROD = 'production',
}

export enum Http {
  CREATED = 201,
  OK = 200,
  ACCEPTED = 202,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  UNPROCESSABLE_ENTITY = 422,
  INTERNAL_SERVER_ERROR = 500
}

export enum MORGAN_FORMAT {
  DEV_FORMAT = '[:date[clf]] :remote-addr :remote-user \x1b[36m:method \x1b[36m:url \x1b[33m:status \x1b[32m:response-time\x1b[36m(ms)\x1b[0m',
  PROD_FORMAT = '[:date[clf]] :remote-addr :remote-user :method :url :status :response-time(ms)'
}

export enum Table {
  TODO = 'mst_todo'
}

export enum Method {
  DEL = 'DELETE',
  PUT = 'PUT',
  POST = 'POST',
  GET = 'GET',
}
