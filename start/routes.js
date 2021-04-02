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

Route.put('user', 'UserController.update')
  .middleware(['auth'])
  .validator('user/Update');

// Routes ClassRoom
Route.get('classroom', 'ClassRoomController.index').middleware(['auth']);

// Routes ClassRoom
Route.get('classroom/:classroomId', 'ClassRoomController.show').middleware([
  'auth',
  'verifyClassroom',
]);

Route.post('classroom/enter', 'ClassRoomController.enterRoom')
  .middleware(['auth'])
  .validator('classroom/EnterRoom');

Route.delete(
  'classroom/leaveRoom/:classroomId',
  'ClassRoomController.leaveRoom'
).middleware(['auth', 'verifyClassroom']);

Route.get(
  'listStudent/:classroomId',
  'ClassRoomController.listStudent'
).middleware(['auth', 'verifyClassroom']);

// Routes Content
Route.get(
  'listComunications/:classroomId',
  'ContentController.listComunications'
).middleware(['auth', 'verifyClassroom']);

Route.get(
  'listActivities/:classroomId',
  'ContentController.listActivities'
).middleware(['auth', 'verifyClassroom']);

Route.get(
  'listMaterial/:classroomId',
  'ContentController.listMaterial'
).middleware(['auth', 'verifyClassroom']);

Route.get(
  'showActivity/:classroomId/:contentId',
  'ContentController.showActivity'
).middleware(['auth', 'verifyClassroom']);
