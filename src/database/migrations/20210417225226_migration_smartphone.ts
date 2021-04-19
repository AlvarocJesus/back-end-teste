import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  knex.schema.createTable('smartphone', function(table){
    table.string('model');
    table.float('model');
    table.string('model');
    table.date('model');
    table.date('model');
    table.string('model'); //fazer interface
    table.string('code').unique();
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('smartphone');
}

