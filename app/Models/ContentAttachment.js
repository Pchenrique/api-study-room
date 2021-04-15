'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');
const Env = use('Env');

class ContentAttachment extends Model {
  static get computed() {
    return ['attachment_url'];
  }

  content() {
    return this.belongsTo('App/Models/Content');
  }

  getAttachmentUrl({ url }) {
    return `${Env.get('APP_URL')}/files/communication/${url}`;
  }
}

module.exports = ContentAttachment;
