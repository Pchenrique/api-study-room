'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ClassRoomSchema extends Schema {
  up() {
    this.create('class_rooms', (table) => {
      table.increments();
      table.string('title', 45).notNullable();
      table.string('code', 20).notNullable().unique();
      table.text('description', 'longtext').notNullable();
      table.string('avatar', 100);
      table.timestamps();
    });
  }

  down() {
    this.drop('class_rooms');
  }
}

module.exports = ClassRoomSchema;
