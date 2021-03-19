'use strict';

const Antl = use('Antl');

class resetReset {
  get rules() {
    return {
      token: 'required|exists:tokens,token',
      password: 'required|confirmed',
    };
  }

  get messages() {
    return Antl.list('validation');
  }

  async fails(errorMessages) {
    return this.ctx.response.status(401).send(errorMessages);
  }
}

module.exports = resetReset;
