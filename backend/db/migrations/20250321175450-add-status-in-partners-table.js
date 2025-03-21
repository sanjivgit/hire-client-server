'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('partners', 'status', {
      type: Sequelize.ENUM('pending', 'approved', 'suspended', 'active'),
      allowNull: false,
      defaultValue: 'pending',
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('partners', 'status');
  }
};
