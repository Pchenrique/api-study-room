'use strict';

/*
|--------------------------------------------------------------------------
| FakeSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
// const Factory = use('Factory');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const ClassRoom = use('App/Models/ClassRoom');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const ContentType = use('App/Models/ContentType');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Content = use('App/Models/Content');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Homework = use('App/Models/Homework');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const ContentAttachment = use('App/Models/ContentAttachment');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const ClassRoomUser = use('App/Models/ClassRoomUser');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const ContentLink = use('App/Models/ContentLink');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const HomeworkResponse = use('App/Models/HomeworkResponse');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const ResponseAttachment = use('App/Models/ResponseAttachment');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const ResponseLink = use('App/Models/ResponseLink');

class FakeSeeder {
  async run() {
    // create user
    await User.create({
      name: 'Paulo Cesar',
      email: 'paulo@gmail.com',
      is_verify: true,
      password: '123123',
      avatar: null,
    });

    await User.create({
      name: 'Nicolas',
      email: 'nicolas@gmail.com',
      is_verify: true,
      password: '123123',
      avatar: null,
    });

    await User.create({
      name: 'Johnny',
      email: 'johnny@teste.com',
      is_verify: true,
      password: 'mudar123',
      avatar: null,
    });

    // create classroom
    await ClassRoom.create({
      user_id: 1,
      title: 'POO',
      code: '123ABC',
      description: 'Programação Orientada a Objetos',
      avatar: null,
    });

    await ClassRoom.create({
      user_id: 1,
      title: 'PDI',
      code: '123ABD',
      description: 'Processamento Digital de Imagem',
      avatar: null,
    });

    await ClassRoom.create({
      user_id: 1,
      title: 'CAA',
      code: '123ABE',
      description: 'Construção e analise de algoritmos',
      avatar: null,
    });

    // create associate classroom
    await ClassRoomUser.create({
      is_teacher: true,
      is_owner: true,
      user_id: 1,
      class_room_id: 1,
    });

    await ClassRoomUser.create({
      is_teacher: true,
      is_owner: true,
      user_id: 1,
      class_room_id: 2,
    });

    await ClassRoomUser.create({
      is_teacher: true,
      is_owner: true,
      user_id: 1,
      class_room_id: 3,
    });

    await ClassRoomUser.create({
      is_teacher: false,
      is_owner: false,
      user_id: 2,
      class_room_id: 2,
    });

    await ClassRoomUser.create({
      is_teacher: false,
      is_owner: false,
      user_id: 3,
      class_room_id: 2,
    });

    // create types communications
    await ContentType.create({
      name: 'Communication',
    });

    await ContentType.create({
      name: 'Activity',
    });

    await ContentType.create({
      name: 'Material',
    });

    // create communication id=1
    await Content.create({
      user_id: 1,
      class_room_id: 1,
      content_type_id: 1,
      title: 'Aula open',
      description:
        'Quizsfazer palco em cima dos indivíduos silenciados por seus lugares de dores infligindo sentimentos de dor na alma dos menos privilegiados, desmobilizou os discursos de seus iguais, silenciados pela heteronormatividade patriarcal sem entender as vicissitudes sociais que abrangem as minorias pobres e desprivilegiadas, que vivem à margem de uma sociedade cruel e opressora.',
    });

    // create communication id=2
    await Content.create({
      user_id: 2,
      class_room_id: 2,
      content_type_id: 1,
      title: 'Aula de programação',
      description:
        'Professor quando vai ser a aula de logica de programação do dia 2 de outubro.',
    });

    // create communication id=3
    await Content.create({
      user_id: 2,
      class_room_id: 2,
      content_type_id: 1,
      title: 'Aula open 3',
      description:
        'Ressignificou inverdades da homoafetividade se aproveitando da apropriação cultural. Alvejou a militância da luta anti-colonialista para propagar inverdades, prestou desacolhimento dos pretos, pardos, miscigenados, indígenas e autoproclamados cujos fenótipos nunca serão sobrepujados em detrimento dos negros, promoveu a deslegitimação da luta anti-colonialista infligindo sentimentos de dor na alma dos menos privilegiados. Deslegitimou a relativação de seus iguais, silenciados pela heteronormatividade patriarcal ressignificando a conversa com inverdades, potencializou o silenciamento da homoafetividade dos gays e não-binários.',
    });

    // create activiteis id=4
    await Content.create({
      user_id: 1,
      class_room_id: 2,
      content_type_id: 2,
      title: 'Atividade 1',
      description:
        'Atividade 1 Atividade 1Atividade 1Atividade 1Atividade 1Atividade 1Atividade 1Atividade 1Atividade 1Atividade 1',
    });

    await Homework.create({
      content_id: 4,
      dateLimit: '2021-04-10 20:00:00+00',
      fullPoints: 100,
    });

    await ContentAttachment.create({
      content_id: 4,
      path: 'test.png_studyroom_15ff_1618591249957_1.jpeg',
      extension: 'png',
      type: 'image',
    });

    await ContentAttachment.create({
      content_id: 4,
      path: 'test2.png_studyroom_12ab_1618591249957_1.jpeg',
      extension: 'png',
      type: 'image',
    });

    await ContentLink.create({
      content_id: 4,
      path: 'https://www.youtube.com/watch?v=9rJGmtsKndY',
      type: 'link',
    });

    await ContentLink.create({
      content_id: 4,
      path: 'https://www.youtube.com/watch?v=9rJGmtsKndY',
      type: 'link',
    });

    // create activity id=5
    await Content.create({
      user_id: 1,
      class_room_id: 2,
      content_type_id: 2,
      title: 'Atividade 2',
      description:
        'Atividade 2 Atividade 2 Atividade 2 Atividade 2 Atividade 2 Atividade 2 Atividade 2 Atividade 2 Atividade 2 Atividade 2',
    });

    await Homework.create({
      content_id: 5,
      hasText: true,
      dateLimit: '2021-04-29 20:00:00+00',
      fullPoints: 10,
    });

    await ContentAttachment.create({
      content_id: 5,
      path: 'test.png_studyroom_15ff_1618591248157_1.jpeg',
      extension: 'png',
      type: 'image',
    });

    await ContentLink.create({
      content_id: 5,
      path: 'https://www.youtube.com/watch?v=9rJGmtsKndY',
      type: 'link',
    });

    // create activity id=6
    await Content.create({
      user_id: 1,
      class_room_id: 2,
      content_type_id: 2,
      title: 'Atividade 3',
      description:
        'Atividade 3 Atividade 3 Atividade 3 Atividade 3 Atividade 3 Atividade 3 Atividade 3 Atividade 3 Atividade 3 Atividade 3',
    });

    await Homework.create({
      content_id: 6,
      hasText: true,
      dateLimit: '2021-05-01 20:00:00+00',
      fullPoints: 100,
    });

    // create activity id=7
    await Content.create({
      user_id: 1,
      class_room_id: 3,
      content_type_id: 2,
      title: 'Atividade Teste',
      description: 'Essa é uma atividade de teste, seja bem vindo!',
    });

    await Homework.create({
      content_id: 7,
      hasText: true,
      dateLimit: '2021-04-29 23:00:00+00',
      fullPoints: 100,
    });

    await ContentAttachment.create({
      content_id: 7,
      path: 'test.png_studyroom_15ff_1618591248157_1.jpeg',
      extension: 'png',
      type: 'image',
    });

    await ContentLink.create({
      content_id: 7,
      path: 'https://www.youtube.com/watch?v=9rJGmtsKndY',
      type: 'link',
    });

    // create response id=1
    await HomeworkResponse.create({
      content_id: 4,
      user_id: 3,
      deliveryDate: '2021-04-08 00:00:29+00',
      status: 'Entregue',
    });

    // create response id=2
    await HomeworkResponse.create({
      content_id: 5,
      user_id: 3,
    });

    await ResponseAttachment.create({
      homework_response_id: 2,
      path: 'teste1.png_studyroom_1250_1618611701526_1.png',
      extension: 'png',
      type: 'image',
    });

    // create response id=3
    await HomeworkResponse.create({
      content_id: 4,
      user_id: 2,
    });

    await ResponseAttachment.create({
      homework_response_id: 3,
      path: 'teste1.png_studyroom_1250_1691611701526_1.png',
      extension: 'png',
      type: 'image',
    });

    await ResponseLink.create({
      homework_response_id: 3,
      path: 'https://www.youtube.com/watch?v=9rJGmtsKndY',
      type: 'link',
    });

    // create Material id=8
    await Content.create({
      user_id: 1,
      class_room_id: 2,
      content_type_id: 3,
      title: 'Material 1',
      description:
        'Material 1 Material 1 Material 1 Material 1 Material 1 Material 1 Material 1 Material 1',
    });

    await ContentAttachment.create({
      content_id: 8,
      path: 'test.png_studyroom_15ff_1618591248157_1.jpeg',
      extension: 'png',
      type: 'image',
    });

    await ContentLink.create({
      content_id: 8,
      path: 'https://www.youtube.com/watch?v=9rJGmtsKndY',
      type: 'link',
    });

    // create Material id=9
    await Content.create({
      user_id: 1,
      class_room_id: 2,
      content_type_id: 3,
      title: 'Material 2',
      description:
        'Material 2 Material 2 Material 2 Material 2 Material 2 Material 2 Material 2 Material 2',
    });

    // create Material id=10
    await Content.create({
      user_id: 1,
      class_room_id: 3,
      content_type_id: 3,
      title: 'Material Teste',
      description: 'Esté é um material teste!',
    });

    await ContentLink.create({
      content_id: 10,
      path: 'https://www.youtube.com/watch?v=9rJGmtsKndY',
      type: 'link',
    });
  }
}

module.exports = FakeSeeder;
