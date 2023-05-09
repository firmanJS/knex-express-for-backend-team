const knex = require('knex');

const knexfile = require('../knexfile');
const { APP_ENV } = require('./environment');

const env = APP_ENV || 'development';
const configCore = knexfile[env];

module.exports = {
  pgCore: knex(configCore)
};
