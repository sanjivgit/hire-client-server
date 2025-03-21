"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("service_requests", "description", {
      type: Sequelize.TEXT, // Change the datatype here (TEXT, STRING, etc.)
      allowNull: true, // Set it as needed
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("service_requests", "description", {
      type: Sequelize.DESCRIPTION, // Change the datatype here (TEXT, STRING, etc.)
      allowNull: true, // Set it as needed
    });
  },
};
