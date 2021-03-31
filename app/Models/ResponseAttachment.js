'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class ResponseAttachment extends Model {
  homeworkResponse() {
    return this.belongsTo('App/Models/HomeworkResponse');
  }
}

module.exports = ResponseAttachment;
