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

// Routes files
Route.get('files/:file', 'FileController.show');

Route.get('files/content/:file', 'FileController.showFileCommunication');

Route.get('files/response/:file', 'FileController.showFileResponse');

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

// Routes communications
Route.get(
  'listComunications/:classroomId',
  'CommunicationController.listComunications'
).middleware(['auth', 'verifyClassroom']);

Route.post('communication/:classroomId', 'CommunicationController.store')
  .middleware(['auth', 'verifyClassroom'])
  .validator('communication/Store');

Route.delete(
  'communication/:communicationId',
  'CommunicationController.destroy'
).middleware(['auth']);

// Routes activities
Route.get(
  'listActivities/:classroomId',
  'ActivityController.listActivities'
).middleware(['auth', 'verifyClassroom']);

Route.get(
  'showActivity/:classroomId/:contentId',
  'ActivityController.showActivity'
).middleware(['auth', 'verifyClassroom']);

// Routes materiais
Route.get(
  'listMaterial/:classroomId',
  'MaterialController.listMaterial'
).middleware(['auth', 'verifyClassroom']);

// Routes comments
Route.post(
  'storeComment/:classroomId/:contentId',
  'CommentController.storeComment'
)
  .middleware(['auth', 'verifyClassroom'])
  .validator('comment/StoreComment');

Route.delete(
  'destroyComment/:commentId',
  'CommentController.destroyComment'
).middleware('auth');

Route.post(
  'storeCommentPrivate/:classroomId/:contentId',
  'CommentController.storeCommentPrivate'
)
  .middleware(['auth', 'verifyClassroom'])
  .validator('comment/StoreComment');

Route.delete(
  'destroyCommentPrivate/:commentId',
  'CommentController.destroyCommentPrivate'
).middleware('auth');

// routes homework response
Route.post(
  'storeLinkResponse/:classroomId/:contentId',
  'HomeworkResponseController.storeLinkResponse'
)
  .middleware(['auth', 'verifyClassroom'])
  .validator('response/StoreLinkResponse');

Route.delete(
  'destroyLinkResponse/:homeworkResponseId/:responseLinkId',
  'HomeworkResponseController.destroyLinkResponse'
).middleware(['auth']);

Route.post(
  'storeAttachmentResponse/:classroomId/:contentId',
  'HomeworkResponseController.storeAttachmentResponse'
)
  .middleware(['auth', 'verifyClassroom'])
  .validator('response/StoreAttachmentResponse');

Route.delete(
  'destroyAttachmentResponse/:homeworkResponseId/:responseAttachmentId',
  'HomeworkResponseController.destroyAttachmentResponse'
).middleware(['auth']);

Route.post(
  'storeResponse/:classroomId/:contentId',
  'HomeworkResponseController.storeResponse'
)
  .middleware(['auth', 'verifyClassroom'])
  .validator('response/StoreResponse');
