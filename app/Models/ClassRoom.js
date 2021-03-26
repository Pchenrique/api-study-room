'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class ClassRoom extends Model {
  users() {
    return this.belongsToMany('App/Models/User')
      .withTimestamps()
      .withPivot(['is_teacher', 'is_owner'])
      .pivotModel('App/Models/ClassRoomUser');
  }
}

module.exports = ClassRoom;
