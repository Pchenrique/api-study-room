'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class ContentLink extends Model {
  content() {
    return this.belongsTo('App/Models/Content');
  }
}

module.exports = ContentLink;
