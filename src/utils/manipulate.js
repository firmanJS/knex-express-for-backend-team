const { lang } = require('../lang');
const { METHOD_TYPE } = require('./constant');
const { customFormat } = require('./date');

exports.messageUpdateType = (options, value) => {
  let message = '';
  if (options?.type_method === METHOD_TYPE.UPDATE) {
    message = lang.__('updated.success', { id: value });
  } else {
    message = lang.__('archive.success', { id: value });
  }

  return message;
};

exports.manipulateDate = (result, isArray = true) => {
  let manipulate;

  if (isArray) {
    manipulate = result.map((r) => {
      if (r?.created_at) r.created_at = customFormat(r.created_at);
      if (r?.updated_at) r.updated_at = customFormat(r.updated_at);
      if (r?.deleted_at) r.deleted_at = customFormat(r.deleted_at);
      return r;
    });
  }
  if (result?.created_at) result.created_at = customFormat(result.created_at);
  if (result?.updated_at) result.updated_at = customFormat(result.updated_at);
  if (result?.deleted_at) result.deleted_at = customFormat(result.deleted_at);
  manipulate = result;
  return manipulate;
};
