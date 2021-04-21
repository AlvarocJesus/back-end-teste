import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  knex.schema.createTable('smartphone', function(table){
    table.string('model');
    table.float('price');
    table.string('brand');
    table.string('startDate');
    table.string('endDate');
    table.string('color'); //fazer interface
    table.string('code').unique();
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('smartphone');
}

