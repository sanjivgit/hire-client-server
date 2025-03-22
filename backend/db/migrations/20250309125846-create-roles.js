'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('roles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER, // Ensure userId is an integer to match users.id
        allowNull: false,
        references: {
          model: 'users', // Refers to the users table
          key: 'id' // Refers to the id column in users table
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE' // Optional: Deletes roles if user is deleted
      },
      role: {
        type: Sequelize.ENUM('admin', 'superAdmin'),
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('roles');
  }
};
