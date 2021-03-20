'use strict';

const Database = use('Database');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Token = use('App/Models/Token');

class CheckEmailController {
  async checkEmail({ request, response }) {
    const trx = await Database.beginTransaction();

    const { token } = request.only(['token']);

    try {
      const userTokenEmail = await Token.findByOrFail('token', token);

      if (userTokenEmail.is_revoked) {
        return response.status(401).json([
          {
            message: 'Token já foi usado',
            field: 'token',
            validation: 'token',
          },
        ]);
      }
      const user = await userTokenEmail.user().fetch();

      user.is_verify = true;

      await user.save(trx);

      userTokenEmail.is_revoked = true;

      await userTokenEmail.save(trx);

      await trx.commit();
    } catch (err) {
      await trx.rollback();
      return response.status(409).json({
        message: 'Unexpected error!',
      });
    }
  }
}

module.exports = CheckEmailController;
