const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const connection = {
  client: process?.env?.DB_DRIVER ?? 'pg',
  host: process?.env?.DB_HOST ?? 'localhost',
  port: process?.env?.DB_PORT ?? 5432,
  user: process?.env?.DB_USER ?? 'example',
  password: process?.env?.DB_PASS ?? 'example',
  database: process?.env?.DB_NAME ?? 'example'
};
module.exports = {
  [process?.env?.APP_ENV]: {
    client: process?.env?.DB_DRIVER,
    connection,
    debug: process?.env?.APP_ENV === 'development',
    migrations: {
      tableName: 'migrations',
      directory: path.join(__dirname, 'repository/postgres/migrations')
    },
    seeds: {
      directory: path.join(__dirname, 'repository/postgres/seeders')
    }
  }
};
