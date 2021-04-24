'use strict';

const Antl = use('Antl');

class responseStoreLinkResponse {
  get rules() {
    return {
      link: 'required|url',
    };
  }

  get messages() {
    return Antl.list('validation');
  }

  async fails(errorMessages) {
    return this.ctx.response.status(401).send(errorMessages);
  }
}

module.exports = responseStoreLinkResponse;
