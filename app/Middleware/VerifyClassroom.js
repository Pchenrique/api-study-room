'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const ClassRoom = use('App/Models/ClassRoom');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Content = use('App/Models/Content');

class VerifyClassroom {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ params, response, auth }, next) {
    const { classroomId, contentId } = params;
    const { user } = auth;

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
        return response.status(403).json([
          {
            message: 'Student does not participate in this classroom',
            field: 'classroom',
            validation: 'participate',
          },
        ]);
      }

      if (contentId !== undefined) {
        const idContent = Number(contentId);

        const contents = await Content.query()
          .where('class_room_id', room.id)
          .fetch();
        const contentsJson = contents.toJSON();

        let confirmContent = false;

        contentsJson.forEach((contentLine) => {
          if (contentLine.id === idContent) {
            confirmContent = true;
          }
        });

        if (!confirmContent) {
          return response.status(403).json([
            {
              message: 'Content does not belong to this class',
              field: 'content',
              validation: 'content',
            },
          ]);
        }
      }

      await next();
    } catch (err) {
      return response.status(401).json(err.message);
      // return response.status(404).json([
      //   {
      //     message: 'classroom not found',
      //     field: 'classroom',
      //     validation: 'not found',
      //   },
      // ]);
    }
  }
}

module.exports = VerifyClassroom;
