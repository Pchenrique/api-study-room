'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ContentSchema extends Schema {
  up() {
    this.create('contents', (table) => {
      table.increments();
      table
        .integer('user_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE');
      table
        .integer('class_room_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('class_rooms')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .integer('content_type_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('content_types')
        .onUpdate('CASCADE');
      table.string('title', 80).notNullable();
      table.text('description', 'longtext').notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('contents');
  }
}

module.exports = ContentSchema;
