const {
  MODEL_PROPERTIES: { TABLES }
} = require('../../../utils');

exports.up = async (knex) =>
  knex.schema.createTable(TABLES.TODO, (table) => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
    table.string('name', 150).notNullable().unique();
    table.text('description');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.uuid('created_by');
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.uuid('updated_by');
    table.timestamp('deleted_at');
    table.uuid('deleted_by');
  });

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async (knex) => knex.schema.dropTable(TABLES.TODO);
