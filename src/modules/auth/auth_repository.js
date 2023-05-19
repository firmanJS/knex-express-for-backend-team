const { pgCore } = require('../../config/database');
const {
  mappingSuccess, mappingError,
  MODEL_PROPERTIES: { TABLES },
  isValidPassword,
  setToken,
} = require('../../utils');
const { lang } = require('../../lang');

const COLUMN_LOGIN = ['id', 'password', 'salt'];
/**
 *
 *
 * @param {object} req
 * @param {object} payload
 * @return {object}
 */
exports.register = async (req, payload) => {
  try {
    const [result] = await pgCore(TABLES.USERS)
      .insert(payload)
      .returning(['created_at']);
    return mappingSuccess(lang.__('register.success'), result);
  } catch (error) {
    error.path_filename = __filename;
    return mappingError(req, error);
  }
};
/**
 *
 *
 * @param {object} req
 * @param {object} payload
 * @return {object}
 */
exports.login = async (req, payload) => {
  try {
    const query = pgCore(TABLES.USERS).where((builder) => {
      builder.where('username', payload.username);
      builder.orWhere('email', payload.username);
      builder.andWhere('deleted_at', null);
    }).select(COLUMN_LOGIN);
    const result = await query.first();
    const validationPassword = isValidPassword({
      password: payload?.password,
      hash: result?.password,
      salt: result?.salt
    });
    if (result && validationPassword === true) {
      const token = setToken({ id: result?.id });
      return mappingSuccess(lang.__('auth.success'), token);
    }
    return mappingSuccess(lang.__('auth.error'), result);
  } catch (error) {
    error.path_filename = __filename;
    return mappingError(req, error);
  }
};
