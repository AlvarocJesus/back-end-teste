import knex from 'knex';
import configuration from '../../knexfile.ts';

const connection = knex(configuration.development);

export { connection };