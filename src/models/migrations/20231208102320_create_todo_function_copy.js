const { FUNC, TABLES } = require('../schema');

exports.up = async (knex) => {
  await knex.raw(`CREATE OR REPLACE FUNCTION ${FUNC.COPY_TODO}
    RETURNS trigger
    LANGUAGE plpgsql
   AS $function$
   BEGIN
       INSERT INTO
           ${TABLES.ARCHIVE_TODO}(id,name,description,created_at,created_by,updated_at,updated_by)
           VALUES(new.id,new.name,new.description,new.created_at,new.created_by,new.updated_at,new.updated_by);

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
  await knex.raw(`DROP FUNCTION ${FUNC.COPY_TODO}`);
};
