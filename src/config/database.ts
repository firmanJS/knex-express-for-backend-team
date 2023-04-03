/* eslint-disable import/extensions */
import { knex } from 'knex';

const knexfile = require('../../knexfile.js');

const pgCore = knex(knexfile.development);

export default pgCore;
