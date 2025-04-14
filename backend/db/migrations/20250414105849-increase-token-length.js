'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Increase token column size to 2000 characters
    await queryInterface.changeColumn('users', 'token', {
      type: Sequelize.STRING(2000),
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    // Revert token column size back to 500 characters
    await queryInterface.changeColumn('users', 'token', {
      type: Sequelize.STRING(500),
      allowNull: true,
    });
  }
}; 