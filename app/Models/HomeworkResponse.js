'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class HomeworkResponse extends Model {
  user() {
    return this.belongsTo('App/Models/User');
  }

  content() {
    return this.belongsTo('App/Models/Content');
  }

  responseAttachments() {
    return this.hasMany('App/Models/ResponseAttachment');
  }

  responseLinks() {
    return this.hasMany('App/Models/ResponseLink');
  }
}

module.exports = HomeworkResponse;
