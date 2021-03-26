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
const Factory = use('Factory');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const ClassRoom = use('App/Models/ClassRoom');

class FakeSeeder {
  async run() {
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
    await ClassRoom.create({
      title: 'POO',
      code: '123ABC',
      description: 'Programação Orientada a Objetos',
      avatar: null,
    });
    await ClassRoom.create({
      title: 'PDI',
      code: '123ABD',
      description: 'Processamento Digital de Imagem',
      avatar: null,
    });
    await ClassRoom.create({
      title: 'CAA',
      code: '123ABE',
      description: 'Construção e analise de algoritmos',
      avatar: null,
    });
  }
}

module.exports = FakeSeeder;
