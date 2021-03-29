'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Content extends Model {
  contentType() {
    return this.belongsTo('App/Models/ContentType');
  }

  contentAttachments() {
    return this.hasMany('App/Models/ContentAttachments');
  }

  commentsContents() {
    return this.hasMany('App/Models/CommentsContent');
  }

  homework() {
    return this.hasOne('App/Models/Homework');
  }
}

module.exports = Content;
