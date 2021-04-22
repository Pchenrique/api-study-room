'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

const Database = use('Database');
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
      .with('contentLinks')
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
    const trx = await Database.beginTransaction();

    const data = request.only(['title', 'description']);
    const { links } = request.only(['links']);
    const files = request.file('files');
    const { classroomId } = params;
    const { user } = auth;

    let namedfiles = [];
    try {
      const contentType = await ContentType.findBy('name', 'Communication');

      const communication = await Content.create(
        {
          class_room_id: classroomId,
          user_id: user.id,
          content_type_id: contentType.id,
          ...data,
        },
        trx
      );

      if (links) {
        await Promise.all(
          links.map((link) =>
            communication.contentLinks().create(
              {
                path: link,
                type: 'link',
              },
              trx
            )
          )
        );
      }

      if (files) {
        const random = await promisify(randomBytes)(2);
        const tokenFile = await random.toString('hex');
        let iteracao = 0;

        // eslint-disable-next-line no-return-assign
        await files.moveAll(
          Helpers.tmpPath('uploads/communication'),
          // eslint-disable-next-line no-return-assign
          (file) => ({
            name: `${
              file.clientName
            }_studyroom_${tokenFile}_${Date.now()}_${(iteracao += 1)}.${
              file.subtype
            }`,
          })
        );

        namedfiles = files.movedList();

        if (!files.movedAll()) {
          const movedFiles = files.movedList();

          await Promise.all(
            movedFiles.map((file) => {
              Drive.delete(
                Helpers.tmpPath(`uploads/communication/${file.fileName}`)
              );
              return '';
            })
          );

          return files.errors();
        }

        await Promise.all(
          files.movedList().map((file) =>
            communication.contentAttachments().create(
              {
                path: file.fileName,
                type: file.type,
                extension: file.subtype,
              },
              trx
            )
          )
        );
      }

      await trx.commit();
      await communication.loadMany(
        ['user', 'contentAttachments', 'contentLinks'],
        null,
        trx
      );
      return response.status(201).json(communication);
    } catch (err) {
      if (namedfiles) {
        await Promise.all(
          namedfiles.map((file) => {
            Drive.delete(
              Helpers.tmpPath(`uploads/communication/${file.fileName}`)
            );
            return '';
          })
        );
      }

      await trx.rollback();
      // return response.status(401).json(err.message);
      return response.status(404).json([
        {
          message:
            'Something happened when trying to register a new announcement',
          field: 'communication',
          validation: 'communication',
        },
      ]);
    }
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
  async destroy({ params, response, auth }) {
    const { communicationId } = params;
    const { user } = auth;

    try {
      const communication = await Content.findOrFail(communicationId);

      if (user.id !== communication.user_id) {
        return response.status(403).json([
          {
            message: 'Communication does not belong to this user',
            field: 'communication',
            validation: 'communication',
          },
        ]);
      }

      await communication.load('contentAttachments');

      const communicationJson = communication.toJSON();
      const files = communicationJson.contentAttachments;
      // console.log(files);

      if (files) {
        await Promise.all(
          files.map((file) => {
            // console.log(file.url);
            Drive.delete(Helpers.tmpPath(`uploads/communication/${file.path}`));
            return '';
          })
        );
      }

      await communication.delete();
    } catch (err) {
      // return response.status(401).json(err.message);
      return response.status(400).json([
        {
          message: 'Communication not found',
          field: 'communication',
          validation: 'communication',
        },
      ]);
    }
  }
}

module.exports = CommunicationController;
