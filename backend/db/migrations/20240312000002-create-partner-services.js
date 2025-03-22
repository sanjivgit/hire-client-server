'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('partner_services', {
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
      service_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'services',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Add unique constraint to prevent duplicate entries
    await queryInterface.addConstraint('partner_services', {
      fields: ['partner_id', 'service_id'],
      type: 'unique',
      name: 'unique_partner_service'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('partner_services');
  }
}; 