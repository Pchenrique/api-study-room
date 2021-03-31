'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ResponseAttachmentSchema extends Schema {
  up() {
    this.create('response_attachments', (table) => {
      table.increments();
      table
        .integer('homework_response_id')
        .unsigned()
        .references('id')
        .inTable('homework_responses')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.string('url', 100).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('response_attachments');
  }
}

module.exports = ResponseAttachmentSchema;
