'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class HomeworkResponse extends Model {
  user() {
    return this.belongsTo('App/Models/User');
  }

  homework() {
    return this.belongsTo('App/Models/Homework');
  }

  responseAttachments() {
    return this.hasMany('App/Models/ResponseAttachments');
  }

  commentsResponses() {
    return this.hasMany('App/Models/CommentsResponse');
  }
}

module.exports = HomeworkResponse;
