const path = require('path')
/**
 * require I18n with capital I as constructor
 */
const { I18n } = require('i18n')

/**
 * create a new instance with it's configuration
 */
const language = process?.env?.LANGUAGE ?? 'id'
const lang = new I18n({
  locales: ['id'],
  defaultLocale: language,
  directory: path.join(__dirname, 'locales')
})

module.exports = {
  lang
}
