'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkUpdate('restaurantLists', { usersId: 2 },
      { id: { [Sequelize.Op.between]: [4, 6] } }
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkUpdate('restaurantLists', { usersId: 1 },
      { id: { [Sequelize.Op.between]: [4, 6] } }
    )
  }
};
