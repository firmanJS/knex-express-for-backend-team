const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../.env') })

const connection = {
  CLIENT: process?.env?.KNEX_CLIENT ?? 'pg',
  host: process?.env?.DB_HOST ?? 'localhost',
  port: process?.env?.DB_PORT ?? 5432,
  user: process?.env?.DB_USER ?? 'example',
  password: process?.env?.DB_PASS ?? 'example',
  database: process?.env?.DB_NAME ?? 'example'
}
module.exports = {
  [process?.env?.NODE_ENV]: {
    client: process?.env?.KNEX_CLIENT,
    connection,
    debug: process?.env?.NODE_ENV === 'development',
    migrations: {
      tableName: 'migrations',
      directory: path.join(__dirname, 'repository/postgres/migrations'),
    },
    seeds: {
      directory: path.join(__dirname, 'repository/postgres/seeders'),
    }
  }
}
