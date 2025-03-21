'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Add foreign key for userId
    await queryInterface.addConstraint('service_requests', {
      fields: ['userId'],
      type: 'foreign key',
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    // Add foreign key for serviceId
    await queryInterface.addConstraint('service_requests', {
      fields: ['serviceId'],
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
    // Remove the constraints
    const constraints = await queryInterface.showConstraints('service_requests');
    for (const constraint of constraints) {
      if (constraint.constraintType === 'FOREIGN KEY') {
        await queryInterface.removeConstraint('service_requests', constraint.constraintName);
      }
    }
  }
}; 