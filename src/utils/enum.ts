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
