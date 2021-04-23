'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class HomeworkResponseSchema extends Schema {
  up() {
    this.create('homework_responses', (table) => {
      table.increments();
      table
        .integer('content_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('contents')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .integer('user_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE');
      table.datetime('deliveryDate');
      table.string('status', 20).default('noReply').notNullable();
      table.float('note').default(null);
      table.text('response', 'longtext');
      table.timestamps();
    });
  }

  down() {
    this.drop('homework_responses');
  }
}

module.exports = HomeworkResponseSchema;
