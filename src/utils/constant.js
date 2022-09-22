module.exports = {
  LIMIT: 10,
  PAGE: 1,
  SQL: {
    SORT: ['ASC', 'DESC']
  },
  HTTP: {
    CREATED: 201,
    OK: 200,
    ACCEPTED: 202,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
  },
  MORGAN_FORMAT: {
    DEV: '[:date[clf]] :remote-addr :remote-user \x1b[36m:method \x1b[36m:url \x1b[33m:status \x1b[32m:response-time\x1b[36m(ms)\x1b[0m',
    PROD: '[:date[clf]] :remote-addr :remote-user :method :url :status :response-time(ms)'
  },
  MODEL_PROPERTIES: {
    TABLES: {
      COLOR: 'mst_color'
    },
    PRIMARY_KEY: {
      ID: 'id'
    }
  }
}
