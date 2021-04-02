'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const ClassRoom = use('App/Models/ClassRoom');

/**
 * Resourceful controller for interacting with classrooms
 */
class ClassRoomController {
  /**
   * Show a list of all classrooms.
   * GET classrooms
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ response, auth }) {
    const { user } = auth;

    const classrooms = await user.classRooms().orderBy('id', 'desc').fetch();

    return response.status(200).json({ classrooms });
  }

  /**
   * Show a list of all classrooms.
   * GET classrooms
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, response }) {
    const { classroomId } = params;

    const classroom = await ClassRoom.find(classroomId);
    return response.status(200).json(classroom);
  }

  /**
   * Create/save a new classroom.
   * POST classrooms
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async enterRoom({ request, response, auth }) {
    const { code } = request.all();
    const { user } = auth;

    const room = await ClassRoom.findByOrFail('code', code);
    const classroomsParticip = await user.classRooms().fetch();

    const rooms = classroomsParticip.toJSON();
    const roomCode = room.toJSON();

    let confirmParticipation = false;

    rooms.forEach((roomLine) => {
      if (roomLine.id === roomCode.id) {
        confirmParticipation = true;
      }
    });

    if (confirmParticipation) {
      return response.status(409).json([
        {
          message: 'Student already participates in this classroom',
          field: 'classroom',
          validation: 'participate',
        },
      ]);
    }

    await user.classRooms().attach(roomCode.id);

    return response.status(201).json(room);
  }

  /**
   * Display a single classroom.
   * GET classrooms/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async listStudent({ params, response }) {
    const { classroomId } = params;

    const classroom = await ClassRoom.findOrFail(classroomId);

    await classroom.load('users', (builder) => {
      builder.select('id', 'name', 'email').orderBy('name', 'asc');
    });

    const classroomJson = classroom.toJSON();
    const total = classroomJson.users.length;
    const classroomJsonFinal = { ...classroomJson, total_student: total };

    return response.status(200).json(classroomJsonFinal);
  }

  /**
   * Update classroom details.
   * PUT or PATCH classrooms/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a classroom with id.
   * DELETE classrooms/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async leaveRoom({ params, auth }) {
    const { classroomId } = params;
    const { user } = auth;

    const room = await ClassRoom.findOrFail(classroomId);
    const roomCode = room.toJSON();

    await user.classRooms().detach(roomCode.id);
  }
}

module.exports = ClassRoomController;
