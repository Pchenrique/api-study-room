'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

const Env = use('Env');

class ClassRoom extends Model {
  static get computed() {
    return ['avatar_url'];
  }

  users() {
    return this.belongsToMany('App/Models/User')
      .withTimestamps()
      .withPivot(['is_teacher', 'is_owner'])
      .pivotModel('App/Models/ClassRoomUser');
  }

  getAvatarUrl({ avatar }) {
    return `${Env.get('APP_URL')}/files/${
      avatar || 'placeholder_classroom.png'
    }`;
  }
}

module.exports = ClassRoom;
