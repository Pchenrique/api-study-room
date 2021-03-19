'use strict';

const Antl = use('Antl');

class authAuthenticate {
  get rules() {
    return {
      email: 'email|required',
      password: 'required',
    };
  }

  get messages() {
    return Antl.list('validation');
  }

  async fails(errorMessages) {
    return this.ctx.response.status(401).send(errorMessages);
  }
}

module.exports = authAuthenticate;
