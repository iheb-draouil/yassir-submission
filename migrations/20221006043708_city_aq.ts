import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {

    return await knex.schema.createTable('city', tb => {

        tb.bigIncrements('id').primary();

        tb.string('name', 50)
            .unique()
            .notNullable();

        tb.double('lon').notNullable();
        tb.double('lat').notNullable();

    })

    .createTable('aq_info', tb => {

        tb.bigIncrements('id').primary();

        tb.bigInteger('city')
        .unsigned()
        .notNullable();

        tb.foreign('city')
        .references('id')
        .inTable('city');

        tb.double('aq').notNullable();
        tb.bigInteger('ts').notNullable();

    });

}

export async function down(knex: Knex): Promise<void> {

    return await knex.schema
    .dropTable('aq_info')
    .dropTable('city');

}
