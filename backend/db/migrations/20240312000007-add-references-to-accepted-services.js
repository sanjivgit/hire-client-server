'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // First modify columns to be not null
    await queryInterface.changeColumn('accepted_services', 'partnerId', {
      type: Sequelize.INTEGER,
      allowNull: false
    });

    await queryInterface.changeColumn('accepted_services', 'serviceRequestId', {
      type: Sequelize.INTEGER,
      allowNull: false
    });

    // Add foreign key for partnerId
    await queryInterface.addConstraint('accepted_services', {
      fields: ['partnerId'],
      type: 'foreign key',
      references: {
        table: 'partners',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    // Add foreign key for serviceRequestId
    await queryInterface.addConstraint('accepted_services', {
      fields: ['serviceRequestId'],
      type: 'foreign key',
      references: {
        table: 'service_requests',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  },

  async down(queryInterface, Sequelize) {
    // Remove the constraints first
    const constraints = await queryInterface.showConstraints('accepted_services');
    for (const constraint of constraints) {
      if (constraint.constraintType === 'FOREIGN KEY') {
        await queryInterface.removeConstraint('accepted_services', constraint.constraintName);
      }
    }

    // Then revert columns to allow null
    await queryInterface.changeColumn('accepted_services', 'partnerId', {
      type: Sequelize.INTEGER,
      allowNull: true
    });

    await queryInterface.changeColumn('accepted_services', 'serviceRequestId', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
  }
}; 