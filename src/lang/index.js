const path = require('path');
/**
 * require I18n with capital I as constructor
 */
const { I18n } = require('i18n');
const { APP_LANGUAGE } = require('../config');

/**
 * create a new instance with it's configuration
 */
const language = APP_LANGUAGE;
const lang = new I18n({
  locales: ['id'],
  defaultLocale: language,
  directory: path.join(__dirname, 'locales')
});

module.exports = {
  lang
};
