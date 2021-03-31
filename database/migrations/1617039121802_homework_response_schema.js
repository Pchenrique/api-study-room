'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class HomeworkResponseSchema extends Schema {
  up() {
    this.create('homework_responses', (table) => {
      table.increments();
      table
        .integer('homework_id')
        .unsigned()
        .references('id')
        .inTable('homeworks')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE');
      table.datetime('deliveryDate').notNullable();
      table.float('note').notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('homework_responses');
  }
}

module.exports = HomeworkResponseSchema;
