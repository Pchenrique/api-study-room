'use strict';

const Antl = use('Antl');

class userUpdate {
  get rules() {
    return {
      avatar: 'required|file_ext:png,jpg,jpeg|file_size:8mb|file_types:image',
    };
  }

  get messages() {
    return Antl.list('validation');
  }

  async fails(errorMessages) {
    return this.ctx.response.status(401).send(errorMessages);
  }
}

module.exports = userUpdate;
