'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ClassroomUserSchema extends Schema {
  up() {
    this.create('classroom_users', (table) => {
      table.increments();
      table.boolean('is_teacher').defaultTo(false);
      table.boolean('is_owner').defaultTo(false);
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
      table.timestamps();
    });
  }

  down() {
    this.drop('classroom_users');
  }
}

module.exports = ClassroomUserSchema;
