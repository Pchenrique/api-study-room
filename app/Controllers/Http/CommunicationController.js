'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

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
    // eslint-disable-next-line camelcase
    const { classroomId } = params;
    const { user } = auth;

    const contentType = await ContentType.findBy('name', 'Communication');

    const communication = await Content.create({
      class_room_id: classroomId,
      user_id: user.id,
      content_type_id: contentType.id,
      ...data,
    });

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
