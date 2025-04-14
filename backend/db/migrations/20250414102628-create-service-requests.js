'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('service_requests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      service_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'services',
          key: 'id'
        }
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
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

    // Add foreign key constraints with cascade rules
    await queryInterface.addConstraint('service_requests', {
      fields: ['user_id'],
      type: 'foreign key',
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    await queryInterface.addConstraint('service_requests', {
      fields: ['service_id'],
      type: 'foreign key',
      references: {
        table: 'services',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  },
  async down(queryInterface, Sequelize) {
    // Remove constraints first
    const constraints = await queryInterface.showConstraints('service_requests');
    for (const constraint of constraints) {
      if (constraint.constraintType === 'FOREIGN KEY') {
        await queryInterface.removeConstraint('service_requests', constraint.constraintName);
      }
    }
    // Then drop the table
    await queryInterface.dropTable('service_requests');
  }
};