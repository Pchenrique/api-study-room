'use strict';

const Antl = use('Antl');

class classroomEnterRoom {
  get rules() {
    return {
      code: 'required|string|exists:class_rooms,code',
    };
  }

  get messages() {
    return Antl.list('validation');
  }

  async fails(errorMessages) {
    return this.ctx.response.status(401).send(errorMessages);
  }
}

module.exports = classroomEnterRoom;
