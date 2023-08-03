exports.up = async (knex) => {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
};

/**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
exports.down = async (knex) => {
  await knex.raw('DROP EXTENSION "uuid-ossp"');
};
