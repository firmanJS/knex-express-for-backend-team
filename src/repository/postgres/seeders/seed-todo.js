const {
  MODEL_PROPERTIES: { TABLES }
} = require('../../../utils');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async (knex) => {
  // Deletes ALL existing entries
  const todos = [
    {
      name: 'todo 1',
      description: ' lorem ipsum'
    }
  ];
  return knex(TABLES.TODO)
    .del()
    .then(() => knex(TABLES.TODO).insert(todos));
};
