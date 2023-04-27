/* eslint-disable import/extensions */
import { knex } from 'knex';
import config from '.';

const knexfile = require('../../knexfile.js');

const pgCore = knex(knexfile[config.app.env]);

export default pgCore;
