import { Knex } from 'knex';
import path from 'path';
import config from './config';
import { Constant } from './utils';

const optionsPath = {
  migrations: {
    tableName: 'migrations',
    directory: path.join(__dirname, 'src/models/migrations')
  },
  seeds: {
    directory: path.join(__dirname, 'src/models/seeds')
  }
};

const postgreConfig: Knex.Config = {
  client: config.db.driver,
  connection: {
    host: config.db.host,
    port: config.db.port,
    user: config.db.username,
    password: config.db.password,
    database: config.db.name
  },
  debug: config.app.env === Constant.Environment.DEV,
  ...optionsPath
};

export default postgreConfig;
