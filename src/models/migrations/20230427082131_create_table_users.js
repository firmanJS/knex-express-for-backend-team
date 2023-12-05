exports.up = async (knex) =>
  knex.schema.createTable('users', (table) => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
    table.string('username', 50).notNullable().unique();
    table.string('email', 100).notNullable().unique();
    table.string('full_name', 150).notNullable().unique();
    table.string('salt', 150).notNullable().unique();
    table.text('password', 'longtext');
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
exports.down = async (knex) => knex.schema.dropTable('users');
