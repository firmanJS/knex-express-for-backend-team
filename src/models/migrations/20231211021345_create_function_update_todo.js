const { FUNC, TABLES } = require('../schema');

exports.up = async (knex) => {
  await knex.raw(`CREATE OR REPLACE FUNCTION ${FUNC.UPDATE_TODO}
    RETURNS trigger
    LANGUAGE plpgsql
   AS $function$
   BEGIN
           UPDATE ${TABLES.ARCHIVE_TODO}
           SET name=new.name, description=new.description, updated_at=new.updated_at, updated_by=new.updated_by
           WHERE id=new.id;
        RETURN new;
   END;
   $function$;
`);
};
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async (knex) => {
  await knex.raw(`DROP FUNCTION ${FUNC.UPDATE_TODO}`);
};
