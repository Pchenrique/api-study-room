'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');
const Env = use('Env');

class ResponseAttachment extends Model {
  static get computed() {
    return ['attachment_url'];
  }

  homeworkResponse() {
    return this.belongsTo('App/Models/HomeworkResponse');
  }

  getAttachmentUrl({ path }) {
    return `${Env.get('APP_URL')}/files/response/${path}`;
  }
}

module.exports = ResponseAttachment;
