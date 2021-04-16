'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Content = use('App/Models/Content');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const CommentsContent = use('App/Models/CommentsContent');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const CommentsResponse = use('App/Models/CommentsResponse');

/**
 * Resourceful controller for interacting with comments
 */
class CommentController {
  /**
   * Show a list of all comments.
   * GET comments
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response }) {}

  /**
   * Create/save a new comment.
   * POST comments
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
   * Create/save a new comment.
   * POST comments
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async storeCommentPrivate({ params, request, response, auth }) {
    const { contentId } = params;
    const data = request.only('comment');
    const { user } = auth;

    const content = await Content.find(contentId);
    await content.load('contentType');

    const contentJson = content.toJSON();

    if (contentJson.contentType.name !== 'Activity') {
      return response.status(403).json([
        {
          message: `${contentJson.contentType.name} cannot have private comment`,
          field: 'content',
          validation: 'content',
        },
      ]);
    }

    const commentsResponse = await CommentsResponse.create({
      user_id: user.id,
      content_id: contentId,
      ...data,
    });

    return response.status(201).json(commentsResponse);
  }

  /**
   * Display a single comment.
   * GET comments/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {}

  /**
   * Update comment details.
   * PUT or PATCH comments/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a comment with id.
   * DELETE comments/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroyComment({ params, response, auth }) {
    const { commentId } = params;
    const { user } = auth;

    try {
      const comment = await CommentsContent.findOrFail(commentId);

      if (user.id !== comment.user_id) {
        return response.status(403).json([
          {
            message: 'Comment does not belong to this user',
            field: 'comment',
            validation: 'comment',
          },
        ]);
      }

      await comment.delete();
    } catch (err) {
      return response.status(400).json([
        {
          message: 'Comment not found',
          field: 'comment',
          validation: 'comment',
        },
      ]);
    }
  }

  async destroyCommentPrivate({ params, response, auth }) {
    const { commentId } = params;
    const { user } = auth;

    try {
      const comment = await CommentsResponse.findOrFail(commentId);

      if (user.id !== comment.user_id) {
        return response.status(403).json([
          {
            message: 'Comment does not belong to this user',
            field: 'comment',
            validation: 'comment',
          },
        ]);
      }

      await comment.delete();
    } catch (err) {
      return response.status(400).json([
        {
          message: 'Comment not found',
          field: 'comment',
          validation: 'comment',
        },
      ]);
    }
  }
}

module.exports = CommentController;
