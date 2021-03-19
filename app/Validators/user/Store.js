'use strict';

const Antl = use('Antl');

class userStore {
  get rules() {
    return {
      name: 'required|string',
      email: 'required|email|unique:users',
      password: 'required|confirmed|min:6|max:100',
      avatar: 'file_ext:png,jpg,jpeg|file_size:8mb|file_types:image',
    };
  }

  get messages() {
    return Antl.list('validation');
  }

  async fails(errorMessages) {
    return this.ctx.response.status(401).send(errorMessages);
  }
}

module.exports = userStore;
