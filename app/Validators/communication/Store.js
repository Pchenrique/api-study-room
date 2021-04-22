'use strict';

const Antl = use('Antl');

class communicationStore {
  get rules() {
    return {
      title: 'required|string',
      description: 'required|string',
      links: 'array|max:9',
      'links.*': 'url',
      files: 'array|max:9',
      'files.*':
        'file|file_ext:svg,ico,gif,png,jpg,jpeg,doc,docx,odt,pdf,wpd,xls,pptx,txt,wmv,mp4,mov,mkv,avi,mpg,mpeg,mp3,ogg,mid,wav,zip,rar,tar.gz,7z|file_size:1000mb',
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
