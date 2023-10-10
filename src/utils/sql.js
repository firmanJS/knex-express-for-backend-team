exports.mapOutput = async (options, query) => {
  let result;
  if (options.type === 'array') {
    result = await query;
  } else {
    result = await query.first();
  }
  return result;
};
