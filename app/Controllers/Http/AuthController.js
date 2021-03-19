'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

class AuthController {
  async authenticate({ request, response, auth }) {
    const { email, password } = request.only(['email', 'password']);

    try {
      const token = await auth.attempt(email, password);

      const user = await User.findByOrFail('email', email);

      return response.status(200).json({ token, user });
    } catch (err) {
      if (err) {
        response.status(401).json([
          {
            message: 'email ou senha incorreto',
            field: 'email/senha',
            validation: 'login',
          },
        ]);
      }
    }
  }
}

module.exports = AuthController;
