'use strict';

const Antl = use('Antl');

class communicationStore {
  get rules() {
    return {
      title: 'required|string',
      description: 'required|string',
    };
  }

  get messages() {
    return Antl.list('validation');
  }

  async fails(errorMessages) {
    return this.ctx.response.status(401).send(errorMessages);
  }
}

module.exports = communicationStore;
