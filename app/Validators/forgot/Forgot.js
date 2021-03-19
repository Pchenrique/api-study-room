'use strict';

const Antl = use('Antl');

class forgotForgot {
  get rules() {
    return {
      email: 'required|email',
    };
  }

  get messages() {
    return Antl.list('validation');
  }

  async fails(errorMessages) {
    return this.ctx.response.status(401).send(errorMessages);
  }
}

module.exports = forgotForgot;
