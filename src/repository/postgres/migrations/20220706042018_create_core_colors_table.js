const { MODEL_PROPERTIES: { TABLES } } = require('../../../utils')

exports.up = function (knex) {
  return knex.schema.createTable(TABLES.COLOR, (table) => {
    table.increments('id').primary();
    table.string('name', 150).notNullable().unique();
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.uuid('created_by')
    table.timestamp('updated_at')
    table.uuid('updated_by')
    table.timestamp('deleted_at')
    table.uuid('deleted_by')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable(TABLES.COLOR);
};
