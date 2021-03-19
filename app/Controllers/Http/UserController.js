'use strict';

const Helpers = use('Helpers');
const { randomBytes } = use('crypto');
const { promisify } = use('util');

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

      return response.status(201).json(user);
    }

    const user = await User.create({
      avatar: null,
      ...data,
    });

    return response.status(201).json(user);
  }
}

module.exports = UserController;
