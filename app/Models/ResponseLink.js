'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class ResponseLink extends Model {
  homeworkResponse() {
    return this.belongsTo('App/Models/HomeworkResponse');
  }
}

module.exports = ResponseLink;
