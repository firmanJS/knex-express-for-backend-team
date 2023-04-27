import dotenv from 'dotenv';
import Translate from 'i18n';
import path from 'path';

dotenv.config();

const defaultLocale: string = process?.env?.APP_LANGUAGE ?? 'en';

Translate.configure({
  locales: ['id', 'en'],
  defaultLocale,
  directory: path.join(__dirname, 'locale'),
});

export default Translate;
