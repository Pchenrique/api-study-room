'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class HomeworkSchema extends Schema {
  up() {
    this.create('homeworks', (table) => {
      table.increments();
      table
        .integer('content_id')
        .unsigned()
        .references('id')
        .inTable('contents')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.datetime('dateLimit').notNullable();
      table.float('fullPoints').default(0).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('homework');
  }
}

module.exports = HomeworkSchema;
