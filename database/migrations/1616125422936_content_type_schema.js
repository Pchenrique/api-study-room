'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ContentTypeSchema extends Schema {
  up() {
    this.create('content_types', (table) => {
      table.increments();
      table.string('name', 45).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('content_types');
  }
}

module.exports = ContentTypeSchema;
