'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class CommentsResponseSchema extends Schema {
  up() {
    this.create('comments_responses', (table) => {
      table.increments();
      table
        .integer('homework_response_id')
        .unsigned()
        .references('id')
        .inTable('homework_responses')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.text('comment', 'longtext').notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('comments_responses');
  }
}

module.exports = CommentsResponseSchema;
