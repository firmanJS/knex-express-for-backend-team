/* eslint-disable import/extensions */
import { knex } from 'knex';
import knexfile from '../knexfile';

const pgCore = knex(knexfile);

export default pgCore;
