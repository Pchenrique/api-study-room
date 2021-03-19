'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ContentSchema extends Schema {
  up() {
    this.create('contents', (table) => {
      table.increments();
      table.string('title', 80).notNullable();
      table.string('description', 254).notNullable();
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE');
      table
        .integer('classroom_id')
        .unsigned()
        .references('id')
        .inTable('classrooms')
        .onUpdate('CASCADE');
      table
        .integer('content_type_id')
        .unsigned()
        .references('id')
        .inTable('content_types')
        .onUpdate('CASCADE');
      table.timestamps();
    });
  }

  down() {
    this.drop('contents');
  }
}

module.exports = ContentSchema;
