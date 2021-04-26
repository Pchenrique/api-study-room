'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ResponseLinkSchema extends Schema {
  up() {
    this.create('response_links', (table) => {
      table.increments();
      table
        .integer('homework_response_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('homework_responses')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.string('path', 255).notNullable();
      table.string('type', 10).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('response_links');
  }
}

module.exports = ResponseLinkSchema;
