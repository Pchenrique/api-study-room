'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class CommentsContentSchema extends Schema {
  up() {
    this.create('comments_contents', (table) => {
      table.increments();
      table
        .integer('user_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .integer('content_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('contents')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.text('comment', 'longtext').notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('comments_contents');
  }
}

module.exports = CommentsContentSchema;
