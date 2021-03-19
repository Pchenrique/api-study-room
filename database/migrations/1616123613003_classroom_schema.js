'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ClassroomSchema extends Schema {
  up() {
    this.create('classrooms', (table) => {
      table.increments();
      table.string('title', 45).notNullable();
      table.text('description', 'longtext').notNullable();
      table.string('avatar', 100);
      table.timestamps();
    });
  }

  down() {
    this.drop('classrooms');
  }
}

module.exports = ClassroomSchema;
