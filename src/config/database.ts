const knexfile = require('../../knexfile.js');
import { knex } from 'knex';
const pgCore = knex(knexfile['development']);

export default pgCore;
