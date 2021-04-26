'use strict';

const Database = use('Database');
const Drive = use('Drive');
const Helpers = use('Helpers');
const { randomBytes } = use('crypto');
const { promisify } = use('util');
const moment = use('moment');

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
        await Drive.delete(
          Helpers.tmpPath(`uploads/response/${file.fileName}`)
        );

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

      await Drive.delete(Helpers.tmpPath(`uploads/response/${file.fileName}`));
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

  async storeResponse({ params, request, response, auth }) {
    const trx = await Database.beginTransaction();

    const { contentId } = params;
    const { user } = auth;

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

      if (
        homeworkResponse.deliveryDate == null &&
        homeworkResponse.status === 'noReply'
      ) {
        const homework = await activity.homework().fetch();
        if (homework.hasText) {
          const data = request.only('response');
          homeworkResponse.response = data.response;
        }

        const checkDelay = moment(
          moment(new Date()).format('YYYY-MM-DD hh:mm')
        ).isAfter(
          moment(homework.dateLimit).format('YYYY-MM-DD hh:mm'),
          'seconds'
        );

        if (checkDelay) {
          homeworkResponse.status = 'Entregue com atraso';
        } else {
          homeworkResponse.status = 'Entregue';
        }

        homeworkResponse.deliveryDate = new Date();

        await homeworkResponse.save(trx);
        await trx.commit();

        return response.status(201).json(homeworkResponse);
      }

      return response.status(404).json([
        {
          message: 'User has already delivered this activity',
          field: 'response',
          validation: 'response',
        },
      ]);
    } catch (err) {
      await trx.rollback();

      // return response.status(401).json(err.message);
      return response.status(404).json([
        {
          message: 'Something happened when trying to record a new answer',
          field: 'response',
          validation: 'response',
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

      if (!responseLink) {
        return response.status(401).json([
          {
            message: 'Link not found in response',
            field: 'response_file',
            validation: 'response_file',
          },
        ]);
      }

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
          field: 'fail',
          validation: 'fail',
        },
      ]);
    }
  }

  async destroyAttachmentResponse({ params, auth, response }) {
    const { homeworkResponseId, responseAttachmentId } = params;
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

      const responseAttachment = await homeworkResponse
        .responseAttachments()
        .where('id', responseAttachmentId)
        .first();

      if (!responseAttachment) {
        return response.status(401).json([
          {
            message: 'File not found in response',
            field: 'response_file',
            validation: 'response_file',
          },
        ]);
      }

      if (responseAttachment.homework_response_id !== homeworkResponse.id) {
        return response.status(403).json([
          {
            message: 'This file does not belong to this answer',
            field: 'response_file',
            validation: 'response_file',
          },
        ]);
      }
      const fileDeleteNome = responseAttachment.path;
      await responseAttachment.delete();

      await Drive.delete(Helpers.tmpPath(`uploads/response/${fileDeleteNome}`));
    } catch (err) {
      // return response.status(401).json(err.message);
      return response.status(401).json([
        {
          message: 'Error when trying to delete the response file',
          field: 'fail',
          validation: 'fail',
        },
      ]);
    }
  }
}

module.exports = HomeworkResponseController;
