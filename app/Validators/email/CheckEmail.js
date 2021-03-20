'use strict';

const Antl = use('Antl');

class emailCheckEmail {
  get rules() {
    return {
      token: 'required|exists:tokens,token',
    };
  }

  get messages() {
    return Antl.list('validation');
  }

  async fails(errorMessages) {
    return this.ctx.response.status(401).send(errorMessages);
  }
}

module.exports = emailCheckEmail;
