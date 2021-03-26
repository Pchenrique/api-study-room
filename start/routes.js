'use strict';

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.post('auth', 'AuthController.authenticate').validator(
  'auth/Authenticate'
);

Route.get('files/:file', 'FileController.show');

Route.post('forgotPassword', 'ForgotPasswordController.store').validator(
  'forgot/Forgot'
);

Route.put('resetPassword', 'ResetPasswordController.reset').validator(
  'reset/Reset'
);

Route.put('checkEmail', 'CheckEmailController.checkEmail').validator(
  'email/CheckEmail'
);

// routes users
Route.post('user', 'UserController.store').validator('user/Store');

// Routes ClassRoom
Route.get('classroom', 'ClassRoomController.index').middleware(['auth']);

// Routes ClassRoom
Route.post('classroom/enter', 'ClassRoomController.enterRoom')
  .middleware(['auth'])
  .validator('classroom/EnterRoom');

Route.delete(
  'classroom/leaveRoom/:classroomId',
  'ClassRoomController.leaveRoom'
).middleware(['auth']);
