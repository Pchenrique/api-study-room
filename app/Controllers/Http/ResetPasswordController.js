'use strict';

const Database = use('Database');
const moment = use('moment');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Token = use('App/Models/Token');

class ResetPasswordController {
  async reset({ request, response }) {
    const trx = await Database.beginTransaction();

    const { token, password } = request.only(['token', 'password']);

    try {
      const userToken = await Token.findByOrFail('token', token);

      const tokenExpired = moment()
        .subtract(2, 'hours')
        .isAfter(userToken.created_at);

      if (tokenExpired || userToken.is_revoked) {
        if (!userToken.is_revoked) {
          userToken.is_revoked = true;
          await userToken.save(trx);
        }

        await trx.commit();

        return response.status(401).json([
          {
            message: 'Token já foi usado ou está expirado.',
            field: 'token',
            validation: 'token',
          },
        ]);
      }
      const user = await userToken.user().fetch();

      user.password = password;

      await user.save(trx);

      userToken.is_revoked = true;

      await userToken.save(trx);

      await trx.commit();
    } catch (err) {
      await trx.rollback();
      return response.status(409).json({
        message: 'Unexpected error!',
      });
    }
  }
}

module.exports = ResetPasswordController;
