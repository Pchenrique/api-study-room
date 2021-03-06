'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ClassRoomSchema extends Schema {
  up() {
    this.create('class_rooms', (table) => {
      table.increments();
      table
        .integer('user_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE');
      table.string('title', 45).notNullable();
      table.string('code', 20).notNullable().unique();
      table.string('subject', 80);
      table.text('description', 'longtext');
      table.string('avatar', 100);
      table.timestamps();
    });
  }

  down() {
    this.drop('class_rooms');
  }
}

module.exports = ClassRoomSchema;
