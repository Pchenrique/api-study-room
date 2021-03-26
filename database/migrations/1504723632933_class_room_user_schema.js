'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ClassRoomUserSchema extends Schema {
  up() {
    this.create('class_room_users', (table) => {
      table.increments();
      table.boolean('is_teacher').defaultTo(false).notNullable();
      table.boolean('is_owner').defaultTo(false).notNullable();
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .index('user_id');
      table
        .integer('class_room_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('class_rooms')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .index('class_room_id');
      table.timestamps();
    });
  }

  down() {
    this.drop('class_room_user');
  }
}

module.exports = ClassRoomUserSchema;
