'use strict';

const Database = use('Database');
const Drive = use('Drive');
const Helpers = use('Helpers');
const { randomBytes } = use('crypto');
const { promisify } = use('util');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Content = use('App/Models/Content');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const HomeworkResponse = use('App/Models/HomeworkResponse');

class HomeworkResponseController {
  async storeLinkResponse({ params, request, response, auth }) {
    const trx = await Database.beginTransaction();

    const { contentId } = params;
    const { user } = auth;
    const data = request.only('link');

    try {
      const activity = await Content.findOrFail(contentId);
      const contentType = await activity.contentType().fetch();

      if (contentType.name !== 'Activity') {
        return response.status(403).json([
          {
            message: 'Content is not an activity',
            field: 'activity',
            validation: 'content',
          },
        ]);
      }

      let homeworkResponse = await activity
        .homeworkResponses()
        .where('content_id', '=', activity.id)
        .where('user_id', '=', user.id)
        .first();

      if (!homeworkResponse) {
        homeworkResponse = await activity.homeworkResponses().create(
          {
            content_id: activity.id,
            user_id: user.id,
          },
          trx
        );
      }

      const responseLink = await homeworkResponse.responseLinks().create(
        {
          homework_response_id: homeworkResponse.id,
          path: data.link,
          type: 'link',
        },
        trx
      );

      await trx.commit();

      return response.status(201).json(responseLink);
    } catch (err) {
      await trx.rollback();

      // return response.status(401).json(err.message);
      return response.status(404).json([
        {
          message:
            'Something happened when trying to register a new link the answer',
          field: 'link',
          validation: 'link',
        },
      ]);
    }
  }

  async storeAttachmentResponse({ params, request, response, auth }) {
    const trx = await Database.beginTransaction();

    const { contentId } = params;
    const { user } = auth;
    const file = request.file('file');

    try {
      const activity = await Content.findOrFail(contentId);
      const contentType = await activity.contentType().fetch();

      if (contentType.name !== 'Activity') {
        return response.status(403).json([
          {
            message: 'Content is not an activity',
            field: 'activity',
            validation: 'content',
          },
        ]);
      }

      let homeworkResponse = await activity
        .homeworkResponses()
        .where('content_id', '=', activity.id)
        .where('user_id', '=', user.id)
        .first();

      if (!homeworkResponse) {
        homeworkResponse = await activity.homeworkResponses().create(
          {
            content_id: activity.id,
            user_id: user.id,
          },
          trx
        );
      }

      const random = await promisify(randomBytes)(2);
      const tokenFile = await random.toString('hex');

      await file.move(Helpers.tmpPath('uploads/response'), {
        name: `${file.clientName}_studyroom_${tokenFile}_${Date.now()}_1.${
          file.subtype
        }`,
      });

      if (!file.moved()) {
        Drive.delete(Helpers.tmpPath(`uploads/response/${file.fileName}`));

        return file.error();
      }

      const responseAttachment = await homeworkResponse
        .responseAttachments()
        .create(
          {
            homework_response_id: homeworkResponse.id,
            path: file.fileName,
            extension: file.subtype,
            type: file.type,
          },
          trx
        );

      await trx.commit();

      return response.status(201).json(responseAttachment);
    } catch (err) {
      await trx.rollback();

      Drive.delete(Helpers.tmpPath(`uploads/response/${file.fileName}`));
      // return response.status(401).json(err.message);
      return response.status(404).json([
        {
          message:
            'Something happened when trying to register a new file the answer',
          field: 'file',
          validation: 'file',
        },
      ]);
    }
  }

  async destroyLinkResponse({ params, auth, response }) {
    const { homeworkResponseId, responseLinkId } = params;
    const { user } = auth;

    try {
      const homeworkResponse = await HomeworkResponse.findOrFail(
        homeworkResponseId
      );

      if (homeworkResponse.user_id !== user.id) {
        return response.status(403).json([
          {
            message: 'This activity response does not belong to this user',
            field: 'homework_response',
            validation: 'homework_response',
          },
        ]);
      }

      const responseLink = await homeworkResponse
        .responseLinks()
        .where('id', responseLinkId)
        .first();

      if (responseLink.homework_response_id !== homeworkResponse.id) {
        return response.status(403).json([
          {
            message: 'This link does not belong to this answer',
            field: 'response_link',
            validation: 'response_link',
          },
        ]);
      }

      await responseLink.delete();
    } catch (err) {
      // return response.status(401).json(err.message);
      return response.status(401).json([
        {
          message: 'Error when trying to delete the response link',
          field: 'authorization',
          validation: 'authorization',
        },
      ]);
    }
  }
}

module.exports = HomeworkResponseController;
