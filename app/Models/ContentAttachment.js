'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class ContentAttachment extends Model {
  content() {
    return this.belongsTo('App/Models/Content');
  }
}

module.exports = ContentAttachment;
