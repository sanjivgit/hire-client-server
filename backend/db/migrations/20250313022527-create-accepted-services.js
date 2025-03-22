'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('accepted_services', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      partner_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'partners',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      service_request_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'service_requests',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      amount: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      status: {
        type: Sequelize.ENUM('pending','in-progress', 'completed', 'rejected'),
        allowNull: false,
        defaultValue: 'pending'
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
    await queryInterface.dropTable('accepted_services');
  }
};