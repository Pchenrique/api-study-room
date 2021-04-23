'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Content = use('App/Models/Content');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const ContentType = use('App/Models/ContentType');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const CommentsResponse = use('App/Models/CommentsResponse');

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
  async listActivities({ params, response, auth }) {
    const { classroomId } = params;
    const { user } = auth;

    const contentType = await ContentType.findBy('name', 'Activity');

    const activities = await Content.query()
      .where('class_room_id', classroomId)
      .where('content_type_id', contentType.id)
      .with('homework')
      .with('user')
      .with('homeworkResponses', (builder) => {
        builder
          .select(
            'id',
            'content_id',
            'user_id',
            'deliveryDate',
            'status',
            'note',
            'response'
          )
          .where('user_id', user.id);
      })
      .orderBy('created_at', 'desc')
      .fetch();

    return response.status(200).json({ dataNow: new Date(), activities });
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
  async showActivity({ params, response, auth }) {
    const { contentId } = params;
    const { user } = auth;

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

    await activity.loadMany({
      user: null,
      homework: null,
      contentAttachments: null,
      homeworkResponses: (builder) =>
        builder
          .select(
            'id',
            'content_id',
            'user_id',
            'deliveryDate',
            'status',
            'note',
            'response'
          )
          .with('responseAttachments')
          .with('responseLinks')
          .where('user_id', user.id),
      commentsContents: (builder) => builder.with('user'),
    });

    // const classroom = await ClassRoom.find(activity.class_room_id);
    // await classroom.load('users', (builder) =>
    //   builder.select('id', 'name', 'email', 'avatar').where('is_teacher', true)
    // );

    // const classroomJson = classroom.toJSON();

    const commentsResponse = await CommentsResponse.query()
      .where('content_id', activity.id)
      .where('user_id', user.id)
      .with('user', (builder) =>
        builder.select('id', 'name', 'email', 'avatar')
      )
      .fetch();

    const commentsResponseJson = commentsResponse.toJSON();

    const line = await CommentsResponse.query()
      .where('content_id', activity.id)
      .where('user_id', '<>', user.id)
      .where('student_id', user.id)
      .with('user', (builder) =>
        builder.select('id', 'name', 'email', 'avatar')
      )
      .fetch();

    const lineJson = line.toJSON();
    const commentsPrivate = [...commentsResponseJson, ...lineJson];

    return response
      .status(200)
      .json({ dataNow: new Date(), activity, commentsPrivate });
  }

  /**
   * Update activity details.
   * PUT or PATCH activities/:ids
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
