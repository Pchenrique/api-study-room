'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class CommentsResponse extends Model {
  user() {
    return this.belongsTo('App/Models/User');
  }

  homeworkResponse() {
    return this.belongsTo('App/Models/HomeworkResponse');
  }
}

module.exports = CommentsResponse;
