'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Content = use('App/Models/Content');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const ContentType = use('App/Models/ContentType');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const CommentsContent = use('App/Models/CommentsContent');

/**
 * Resourceful controller for interacting with contents
 */
class ContentController {
  /**
   * Show a list of all contents.
   * GET contents
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async listActivities({ params, response }) {
    const { classroomId } = params;

    const contentType = await ContentType.findBy('name', 'Activity');

    const activities = await Content.query()
      .where('class_room_id', classroomId)
      .where('content_type_id', contentType.id)
      .with('homework')
      .with('user')
      .fetch();

    return response.status(200).json(activities);
  }

  /**
   * Show a list of all contents.
   * GET contents
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
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
      .fetch();

    return response.status(200).json(comunications);
  }

  /**
   * Show a list of all contents.
   * GET contents
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async listMaterial({ params, response }) {
    const { classroomId } = params;

    const contentType = await ContentType.findBy('name', 'Material');

    const materiais = await Content.query()
      .where('class_room_id', classroomId)
      .where('content_type_id', contentType.id)
      .with('user')
      .with('contentAttachments')
      .fetch();

    return response.status(200).json(materiais);
  }

  /**
   * Create/save a new content.
   * POST contents
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async storeComment({ params, request, response, auth }) {
    const { contentId } = params;
    const data = request.only('comment');
    const { user } = auth;

    const content = await Content.find(contentId);
    await content.load('contentType');

    const contentJson = content.toJSON();

    if (contentJson.contentType.name === 'Material') {
      return response.status(403).json([
        {
          message: 'Material content cannot have comments',
          field: 'content',
          validation: 'content',
        },
      ]);
    }

    const commentsContent = await CommentsContent.create({
      user_id: user.id,
      content_id: contentId,
      ...data,
    });

    return response.status(201).json(commentsContent);
  }

  /**
   * Display a single content.
   * GET contents/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async showActivity({ params, response }) {
    const { contentId } = params;

    const activity = await Content.findOrFail(contentId);

    const contentType = await ContentType.find(activity.content_type_id);

    if (contentType.name !== 'Activity') {
      return response.status(403).json([
        {
          message: 'Content is not an activity',
          field: 'activity',
          validation: 'content',
        },
      ]);
    }

    await activity.loadMany([
      'user',
      'homework',
      'contentAttachments',
      'commentsContents.user',
    ]);

    return response.status(200).json(activity);
  }

  /**
   * Update content details.
   * PUT or PATCH contents/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a content with id.
   * DELETE contents/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}
}

module.exports = ContentController;
