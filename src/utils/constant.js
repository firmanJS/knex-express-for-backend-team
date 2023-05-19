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
    UNPROCESSABLE_ENTITY: 422,
    INTERNAL_SERVER_ERROR: 500
  },
  MORGAN_FORMAT: {
    DEV: '[:date[clf]] :remote-addr :remote-user \x1b[36m:method \x1b[36m:url \x1b[33m:status \x1b[32m:response-time\x1b[36m(ms)\x1b[0m',
    PROD: '[:date[clf]] :remote-addr :remote-user :method :url :status :response-time(ms)'
  },
  ENUM: {
    JABATAN: ['hr', 'developer', 'pm']
  },
  METHOD: {
    DEL: 'DELETE',
    PUT: 'PUT',
    POST: 'POST',
    GET: 'GET',
  },
  METHOD_TYPE: {
    UPDATE: 'updated',
    SOFT_DELETE: 'soft-delete'
  },
  MODEL_PROPERTIES: {
    TABLES: {
      TODO: 'mst_todo',
      USERS: 'users'
    },
    PRIMARY_KEY: {
      ID: 'id'
    },
    CREATED: [
      'created_at', 'created_by',
      'updated_at', 'updated_by', 'deleted_at', 'deleted_by'
    ],
    DATE_ONLY: [
      'created_at', 'updated_at', 'deleted_at'
    ]
  }
};
