'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ContentAttachmentSchema extends Schema {
  up() {
    this.create('content_attachments', (table) => {
      table.increments();
      table
        .integer('content_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('contents')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.string('path', 255).notNullable();
      table.string('extension', 10).notNullable();
      table.string('type', 100).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('content_attachments');
  }
}

module.exports = ContentAttachmentSchema;
