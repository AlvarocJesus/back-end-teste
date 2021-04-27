import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  knex.schema.alterTable('smartphone', table => {
    table.timestamp('deleted_at')
  })
}


export async function down(knex: Knex): Promise<void> {
  knex.schema.alterTable('smartphone', table => {
    table.dropColumn('deleted_at')
  })
}

