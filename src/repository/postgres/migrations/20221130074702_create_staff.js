const { MODEL_PROPERTIES: { TABLES }, ENUM } = require('../../../utils');

exports.up = async (knex) => knex.schema.createTable(TABLES.STAFF, (table) => {
  table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
  table.string('name', 150).notNullable().unique();
  table.string('email');
  table.enum('jabatan', ENUM.JABATAN);
  table.timestamp('created_at').defaultTo(knex.fn.now());
  table.timestamp('updated_at').defaultTo(knex.fn.now());
  table.timestamp('deleted_at');
});

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async (knex) => knex.schema.dropTable(TABLES.STAFF);
