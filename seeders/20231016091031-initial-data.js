'use strict';

const restaurantData = require('../public/jsons/restaurant.json').results
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('restaurantLists', restaurantData.map(restaurant => ({ ...restaurant, createdAt: new Date(), updatedAt: new Date() })))
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
