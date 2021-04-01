'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class HomeworkResponseSchema extends Schema {
  up() {
    this.create('homework_responses', (table) => {
      table.increments();
      table
        .integer('homework_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('homework')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .integer('user_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE');
      table.datetime('deliveryDate').notNullable();
      table.float('note').default(0).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('homework_responses');
  }
}

module.exports = HomeworkResponseSchema;
