// 'use strict';

// /** @typedef {import('@adonisjs/framework/src/Request')} Request */
// /** @typedef {import('@adonisjs/framework/src/Response')} Response */
// /** @typedef {import('@adonisjs/framework/src/View')} View */

// /** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */

// const HomeWork = use('App/Models/HomeWork');

// class HomeWorkController {
//   /**
//    * Show a list of all homeworks.
//    * GET homeworks
//    *
//    * @param {object} ctx
//    * @param {Request} ctx.request
//    * @param {Response} ctx.response
//    */
//   async index({ response, id }) {
//     const homeworks = await HomeWork().select().where('classroom_id', id);

//     return response.status(200).json({ homeworks });
//   }
// }

// module.exports = HomeWorkController;
