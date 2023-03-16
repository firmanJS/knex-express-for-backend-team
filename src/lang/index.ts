import Translate from 'i18n'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config()

const defaultLocale: string = process?.env?.APP_LANGUAGE ?? 'en'
console.log(defaultLocale);

Translate.configure({
  locales: ['id','en'],
  defaultLocale,
  directory: path.join(__dirname, 'locale')
})

export default Translate
