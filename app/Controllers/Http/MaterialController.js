'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Content = use('App/Models/Content');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const ContentType = use('App/Models/ContentType');

/**
 * Resourceful controller for interacting with materials
 */
class MaterialController {
  /**
   * Show a list of all materials.
   * GET materials
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async listMaterial({ params, response }) {
    const { classroomId } = params;

    const contentType = await ContentType.findBy('name', 'Material');

    const materiais = await Content.query()
      .where('class_room_id', classroomId)
      .where('content_type_id', contentType.id)
      .with('user')
      .with('contentAttachments')
      .orderBy('created_at', 'desc')
      .fetch();

    return response.status(200).json(materiais);
  }

  /**
   * Create/save a new material.
   * POST materials
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {}

  /**
   * Display a single material.
   * GET materials/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {}

  /**
   * Update material details.
   * PUT or PATCH materials/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a material with id.
   * DELETE materials/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}
}

module.exports = MaterialController;
