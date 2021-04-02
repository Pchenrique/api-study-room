'use strict';

const Helpers = use('Helpers');
const { randomBytes } = use('crypto');
const { promisify } = use('util');
const Env = use('Env');
const Mail = use('Mail');
const Drive = use('Drive');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

class UserController {
  async store({ request, response }) {
    const data = request.only(['name', 'email', 'password']);
    const avatar = request.file('avatar');

    if (avatar) {
      const random = await promisify(randomBytes)(14);
      const tokenImg = await random.toString('hex');

      await avatar.move(Helpers.tmpPath('uploads'), {
        name: `${tokenImg}_${new Date().getTime()}_profile.${avatar.subtype}`,
      });
      if (!avatar.moved()) {
        return avatar.error();
      }

      const user = await User.create({
        avatar: avatar.fileName,
        ...data,
      });

      const randomEmail = await promisify(randomBytes)(18);
      const token = await randomEmail.toString('hex');

      await user.tokens().create({
        token,
        type: 'check_email',
      });

      const checkEmailUrl = `${Env.get(
        'FRONT_URL'
      )}/check-email?token=${token}`;

      await Mail.send(
        'emails.checkEmail',
        { user, checkEmailUrl },
        (message) => {
          message
            .from('suporte@studyroom.com.br')
            .to(user.email)
            .subject('Verificação de email');
        }
      );

      return response.status(201).json(user);
    }

    const user = await User.create({
      avatar: null,
      ...data,
    });

    const randomEmail = await promisify(randomBytes)(18);
    const token = await randomEmail.toString('hex');

    await user.tokens().create({
      token,
      type: 'check_email',
    });

    const checkEmailUrl = `${Env.get('FRONT_URL')}/check-email?token=${token}`;

    await Mail.send('emails.checkEmail', { user, checkEmailUrl }, (message) => {
      message
        .from('suporte@studyroom.com.br')
        .to(user.email)
        .subject('Verificação de email');
    });

    return response.status(201).json(user);
  }

  async update({ auth, request, response }) {
    const avatar = request.file('avatar');
    const { user } = auth;

    const random = await promisify(randomBytes)(14);
    const tokenImg = await random.toString('hex');

    await avatar.move(Helpers.tmpPath('uploads'), {
      name: `${tokenImg}_${new Date().getTime()}_profile.${avatar.subtype}`,
    });

    if (!avatar.moved()) {
      return avatar.error();
    }

    if (user.avatar) {
      const oldFileTmp = user.avatar;
      await Drive.delete(Helpers.tmpPath(`uploads/${oldFileTmp}`));
    }

    user.avatar = avatar.fileName;
    await user.save();

    return response.status(200).json(user);
  }
}

module.exports = UserController;
