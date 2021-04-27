import { Knex } from "knex";
const { onUpdateTrigger } = require('../../../knexfile')

export async function up(knex: Knex): Promise<void> {
  knex.schema.createTable('smartphone', function(table) {
    table.text('model').notNullable(),
    table.float('price').notNullable(),
    table.text('brand').notNullable(),
    table.date('startDate').notNullable(),
    table.date('endDate').notNullable(),
    table.text('color').notNullable(),
    table.text('code').unique().notNullable().primary(),

    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  }).then(() => knex.raw(onUpdateTrigger('smartphone')))

  
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('smartphone');
}

