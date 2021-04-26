'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ContentLinkSchema extends Schema {
  up() {
    this.create('content_links', (table) => {
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
      table.string('type', 10).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('content_links');
  }
}

module.exports = ContentLinkSchema;
