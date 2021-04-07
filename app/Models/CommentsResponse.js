'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class CommentsResponse extends Model {
  user() {
    return this.belongsTo('App/Models/User');
  }

  content() {
    return this.belongsTo('App/Models/Content');
  }
}

module.exports = CommentsResponse;
