exports.reqParam = (req) => ({ ...req?.params });

exports.reqQuery = (req) => ({ ...req?.query });

exports.reqBody = (req) => ({ ...req?.body });

exports.isNumeric = (str) => {
  if (typeof str !== 'string') return false;
  return !Number.isNaN(str) && !Number.isNaN(parseFloat(str));
};

exports.convertToSlug = (text = '') => {
  try {
    return text
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
  } catch (error) {
    return error.toString();
  }
};

exports.replaceString = (str, from, to = '') => {
  try {
    return str.replace(from, to);
  } catch (error) {
    return error.toString();
  }
};

exports.ucword = (str = '') => {
  if (typeof str !== 'string') return str;
  return `${str}`.replace(/^([a-z])|\s+([a-z])/g, ($1) => $1.toUpperCase());
};

exports.formatCurrency = (
  currency,
  options = {
    language: 'id-ID',
    format: 'IDR'
  }
) => {
  try {
    const moneyFormat = Intl.NumberFormat(options?.language, {
      style: 'currency',
      currency: options?.format
    });

    return moneyFormat.format(currency);
  } catch (error) {
    return error.toString();
  }
};
