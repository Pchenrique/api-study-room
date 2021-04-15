'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

const Drive = use('Drive');
const Helpers = use('Helpers');
const { randomBytes } = use('crypto');
const { promisify } = use('util');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Content = use('App/Models/Content');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const ContentType = use('App/Models/ContentType');

/**
 * Resourceful controller for interacting with communications
 */
class CommunicationController {
  /**
   * Show a list of all communications.
   * GET communications
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async listComunications({ params, response }) {
    const { classroomId } = params;

    const contentType = await ContentType.findBy('name', 'Communication');

    const comunications = await Content.query()
      .where('class_room_id', classroomId)
      .where('content_type_id', contentType.id)
      .with('user')
      .with('contentAttachments')
      .with('commentsContents.user')
      .orderBy('created_at', 'desc')
      .fetch();

    return response.status(200).json(comunications);
  }

  /**
   * Create/save a new communication.
   * POST communications
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ params, request, response, auth }) {
    const data = request.only(['title', 'description']);
    const files = request.file('files');
    const { classroomId } = params;
    const { user } = auth;

    const contentType = await ContentType.findBy('name', 'Communication');

    const communication = await Content.create({
      class_room_id: classroomId,
      user_id: user.id,
      content_type_id: contentType.id,
      ...data,
    });

    if (files) {
      const random = await promisify(randomBytes)(8);
      const tokenFile = await random.toString('hex');
      let iteracao = 0;

      // eslint-disable-next-line no-return-assign
      await files.moveAll(Helpers.tmpPath('uploads/communication'), (file) => ({
        name: `${
          communication.id
        }_${tokenFile}_${new Date().getTime()}_${(iteracao += 1)}.${
          file.subtype
        }`,
      }));

      if (!files.movedAll()) {
        const movedFiles = files.movedList();

        await Promise.all(
          movedFiles.map((file) => {
            Drive.delete(Helpers.tmpPath(`uploads/${file.fileName}`));
            return '';
          })
        );

        return files.errors();
      }

      await Promise.all(
        files
          .movedList()
          .map((file) =>
            communication.contentAttachments().create({ url: file.fileName })
          )
      );
    }

    await communication.loadMany(['user', 'contentAttachments']);
    return response.status(201).json(communication);
  }

  /**
   * Display a single communication.
   * GET communications/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response }) {}

  /**
   * Update communication details.
   * PUT or PATCH communications/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a communication with id.
   * DELETE communications/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}
}

module.exports = CommunicationController;
