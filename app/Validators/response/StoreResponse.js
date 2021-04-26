'use strict';

const Antl = use('Antl');

class responseStoreResponse {
  get rules() {
    return {
      response: 'string|min:1',
    };
  }

  get messages() {
    return Antl.list('validation');
  }

  async fails(errorMessages) {
    return this.ctx.response.status(401).send(errorMessages);
  }
}

module.exports = responseStoreResponse;
