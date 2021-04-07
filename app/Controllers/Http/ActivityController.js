'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Content = use('App/Models/Content');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const ContentType = use('App/Models/ContentType');

/**
 * Resourceful controller for interacting with activities
 */
class ActivityController {
  /**
   * Show a list of all activities.
   * GET activities
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
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
   * Create/save a new activity.
   * POST activities
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {}

  /**
   * Display a single activity.
   * GET activities/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
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
   * Update activity details.
   * PUT or PATCH activities/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a activity with id.
   * DELETE activities/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}
}

module.exports = ActivityController;
