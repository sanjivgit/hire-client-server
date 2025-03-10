'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn("users", "token", {
      type: Sequelize.STRING(500), // New length
      allowNull: true,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn("users", "token", {
      type: Sequelize.STRING, // Revert if needed
      allowNull: true,
    });
  }
};
