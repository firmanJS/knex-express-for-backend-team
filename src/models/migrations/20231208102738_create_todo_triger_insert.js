const { TRIGGER, FUNC, TABLES } = require('../schema');

exports.up = async (knex) =>
  knex.schema.raw(`create trigger ${TRIGGER.TODO} after insert on
      ${TABLES.TODO} for each row execute function ${FUNC.COPY_TODO};
  `);

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) =>
  knex.schema.raw(`DROP TRIGGER ${TRIGGER.TODO} ON ${TABLES.TODO}`);
