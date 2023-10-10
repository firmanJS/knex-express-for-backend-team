const { pgCore } = require('../../config');
const {
  MODEL_PROPERTIES: { CREATED, TABLES },
  isSoftDeleted
} = require('../../utils');
// function cloning
const condition = (builder, options) => {
  const single = true;
  builder = isSoftDeleted(options.where, builder, single);
  if (options?.filter?.search) {
    builder.whereILike('name', `%${options?.filter?.search}%`);
  }
  return builder;
};

exports.sql = (options) => {
  const query = pgCore(TABLES.TODO).where((builder) => {
    condition(builder, options);
  });

  return query;
};
// end cloning
const COLUMN = ['id', 'name', 'description', ...CREATED];
exports.COLUMN = COLUMN;
exports.SCHEMA_REQUEST = ['name', 'description'];
exports.DEFAULT_SORT = [COLUMN[0], 'DESC'];
