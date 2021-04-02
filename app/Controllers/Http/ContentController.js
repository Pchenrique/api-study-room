'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Content = use('App/Models/Content');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const ContentType = use('App/Models/ContentType');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const ClassRoom = use('App/Models/ClassRoom');

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
  async listActivities({ params, response, auth }) {
    const { classroomId } = params;
    const { user } = auth;

    const contentType = await ContentType.findBy('name', 'Activity');

    try {
      const room = await ClassRoom.findOrFail(classroomId);
      const classroomsParticip = await user.classRooms().fetch();

      const rooms = classroomsParticip.toJSON();
      const roomCode = room.toJSON();

      let confirmParticipation = false;

      rooms.forEach((roomLine) => {
        if (roomLine.id === roomCode.id) {
          confirmParticipation = true;
        }
      });

      if (!confirmParticipation) {
        return response.status(409).json([
          {
            message: 'Student does not participate in this classroom',
            field: 'classroom',
            validation: 'participate',
          },
        ]);
      }

      const activities = await Content.query()
        .where('class_room_id', classroomId)
        .where('content_type_id', contentType.id)
        .with('user')
        .with('homework')
        .with('contentAttachments')
        .with('commentsContents.user')
        .fetch();

      return response.status(200).json(activities);
    } catch (err) {
      return response.status(404).json([
        {
          message: 'classroom not found',
          field: 'classroom',
          validation: 'not found',
        },
      ]);
    }
  }

  /**
   * Show a list of all contents.
   * GET contents
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async listComunications({ params, response, auth }) {
    const { classroomId } = params;
    const { user } = auth;

    const contentType = await ContentType.findBy('name', 'Communication');

    try {
      const room = await ClassRoom.findOrFail(classroomId);
      const classroomsParticip = await user.classRooms().fetch();

      const rooms = classroomsParticip.toJSON();
      const roomCode = room.toJSON();

      let confirmParticipation = false;

      rooms.forEach((roomLine) => {
        if (roomLine.id === roomCode.id) {
          confirmParticipation = true;
        }
      });

      if (!confirmParticipation) {
        return response.status(409).json([
          {
            message: 'Student does not participate in this classroom',
            field: 'classroom',
            validation: 'participate',
          },
        ]);
      }

      const comunications = await Content.query()
        .where('class_room_id', classroomId)
        .where('content_type_id', contentType.id)
        .with('user')
        .with('contentAttachments')
        .with('commentsContents.user')
        .fetch();

      return response.status(200).json(comunications);
    } catch (err) {
      return response.status(404).json([
        {
          message: 'classroom not found',
          fiels: 'classroom',
          validation: 'not found',
        },
      ]);
    }
  }

  /**
   * Show a list of all contents.
   * GET contents
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async listMaterial({ params, response, auth }) {
    const { classroomId } = params;
    const { user } = auth;

    const contentType = await ContentType.findBy('name', 'Material');

    try {
      const room = await ClassRoom.findOrFail(classroomId);
      const classroomsParticip = await user.classRooms().fetch();

      const rooms = classroomsParticip.toJSON();
      const roomCode = room.toJSON();

      let confirmParticipation = false;

      rooms.forEach((roomLine) => {
        if (roomLine.id === roomCode.id) {
          confirmParticipation = true;
        }
      });

      if (!confirmParticipation) {
        return response.status(409).json([
          {
            message: 'Student does not participate in this classroom',
            field: 'classroom',
            validation: 'participate',
          },
        ]);
      }

      const materiais = await Content.query()
        .where('class_room_id', classroomId)
        .where('content_type_id', contentType.id)
        .with('user')
        .with('contentAttachments')
        .fetch();

      return response.status(200).json(materiais);
    } catch (err) {
      return response.status(404).json([
        {
          message: 'classroom not found',
          field: 'classroom',
          validation: 'not found',
        },
      ]);
    }
  }

  /**
   * Create/save a new content.
   * POST contents
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) { }

  /**
   * Display a single content.
   * GET contents/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async show({ params, request, response }) { }

  /**
   * Update content details.
   * PUT or PATCH contents/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) { }

  /**
   * Delete a content with id.
   * DELETE contents/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) { }
}

module.exports = ContentController;
