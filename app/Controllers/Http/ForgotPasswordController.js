'use strict';

const Env = use('Env');
const Mail = use('Mail');

const { randomBytes } = require('crypto');
const { promisify } = require('util');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

class ForgotPasswordController {
  async store({ request, response }) {
    const email = request.input('email');

    try {
      const user = await User.findByOrFail('email', email);

      const random = await promisify(randomBytes)(18);
      const token = await random.toString('hex');

      await user.tokens().create({
        token,
        type: 'forgot_password',
      });

      const resetPasswordUrl = `${Env.get(
        'FRONT_URL'
      )}/forgot-password?token=${token}`;

      await Mail.send(
        'emails.forgotPassword',
        { name: user.name, resetPasswordUrl },
        (message) => {
          message
            .from('suporte@studyroom.com.br')
            .to(user.email)
            .subject('Recuperação de senha');
        }
      );
    } catch (err) {
      response.status(401).json([
        {
          message: 'Não existe usuários com esse email.',
          field: 'email',
          validation: 'email',
        },
      ]);
    }
  }
}

module.exports = ForgotPasswordController;
