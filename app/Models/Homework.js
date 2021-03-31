'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Homework extends Model {
  content() {
    return this.belongsTo('App/Models/Content');
  }

  homeworkResponses() {
    return this.hasMany('App/Models/HomeworkResponse');
  }
}

module.exports = Homework;
