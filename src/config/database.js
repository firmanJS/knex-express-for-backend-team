const knex = require('knex')

const knexfile = require('../knexfile')

const env = process.env.NODE_ENV || 'development'
const configCore = knexfile[env]

module.exports = {
  pgCore: knex(configCore)
}
