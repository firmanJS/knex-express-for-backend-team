const { lang } = require('../lang');
const { METHOD_TYPE, MODEL_PROPERTIES: { DATE_ONLY } } = require('./constant');
const { customFormat } = require('./date');

exports.updateMessageType = (options, value) => {
  let message = lang.__('archive.success', { id: value });
  if (options?.type_method === METHOD_TYPE.UPDATE) {
    message = lang.__('updated.success', { id: value });
  }
  return message;
};

exports.manipulateDate = (result, isArray = true, column = DATE_ONLY) => {
  let manipulate;
  if (isArray) {
    manipulate = result.map((r) => {
      for (let index = 0; index < column.length; index += 1) {
        if (r[column[index]]) r[column[index]] = customFormat(r[column[index]]);
      }
      return r;
    });
  }
  for (let index = 0; index < column.length; index += 1) {
    if (result[column[index]]) result[column[index]] = customFormat(result[column[index]]);
  }
  manipulate = result;
  return manipulate;
};
