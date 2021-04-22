'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Content extends Model {
  user() {
    return this.belongsTo('App/Models/User');
  }

  contentType() {
    return this.belongsTo('App/Models/ContentType');
  }

  contentAttachments() {
    return this.hasMany('App/Models/ContentAttachment');
  }

  contentLinks() {
    return this.hasMany('App/Models/ContentLink');
  }

  commentsContents() {
    return this.hasMany('App/Models/CommentsContent');
  }

  homework() {
    return this.hasOne('App/Models/Homework');
  }

  commentsResponse() {
    return this.hasMany('App/Models/CommentsResponse');
  }
}

module.exports = Content;
