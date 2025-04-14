'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('services', 'icon_id', {
      type: Sequelize.INTEGER,
      allowNull: true, // or false if mandatory
      references: {
        model: 'files', // Table name being referenced
        key: 'id',      // Primary key in the referenced table
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL', // or 'CASCADE' based on your requirement
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('services', 'icon_id');
  }
};
