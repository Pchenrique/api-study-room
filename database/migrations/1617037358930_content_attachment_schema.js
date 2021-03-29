'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ContentAttachmentSchema extends Schema {
  up() {
    this.create('content_attachments', (table) => {
      table.increments();
      table
        .integer('content_id')
        .unsigned()
        .references('id')
        .inTable('contents')
        .onUpdate('CASCADE');
      table.string('url', 100).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('content_attachments');
  }
}

module.exports = ContentAttachmentSchema;
