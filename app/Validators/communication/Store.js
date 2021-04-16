'use strict';

const Antl = use('Antl');

class communicationStore {
  get rules() {
    return {
      title: 'required|string',
      description: 'required|string',
      files: 'array|max:9',
      'files.*':
        'file|file_ext:png,jpg,jpeg,pdf,txt,mp4,zip,rar|file_size:100mb',
    };
  }

  // validação de tipo -> file_types:image,video

  get messages() {
    return Antl.list('validation');
  }

  async fails(errorMessages) {
    return this.ctx.response.status(401).send(errorMessages);
  }
}

module.exports = communicationStore;
