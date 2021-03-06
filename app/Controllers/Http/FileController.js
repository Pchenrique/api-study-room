'use strict';

const Helpers = use('Helpers');

class FileController {
  async show({ params, response }) {
    return response.download(Helpers.tmpPath(`uploads/${params.file}`));
  }

  async showFileCommunication({ params, response }) {
    return response.download(
      Helpers.tmpPath(`uploads/communication/${params.file}`)
    );
  }

  async showFileResponse({ params, response }) {
    return response.download(
      Helpers.tmpPath(`uploads/response/${params.file}`)
    );
  }
}

module.exports = FileController;
