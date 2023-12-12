const { TRIGGER, FUNC, TABLES } = require('../schema');

exports.up = async (knex) =>
  knex.schema.raw(`create trigger ${TRIGGER.UPDATE_TODO} after update on
      ${TABLES.TODO} for each row execute function ${FUNC.UPDATE_TODO};
  `);

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) =>
  knex.schema.raw(`DROP TRIGGER ${TRIGGER.UPDATE_TODO} ON ${TABLES.TODO}`);
