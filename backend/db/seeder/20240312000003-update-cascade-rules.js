'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Update userId foreign key in partners table
    await queryInterface.removeConstraint('partners', 'partners_userId_fkey');
    await queryInterface.addConstraint('partners', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'partners_userId_fkey',
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    // Update serviceTypeId foreign key in partners table
    await queryInterface.removeConstraint('partners', 'partners_serviceTypeId_fkey');
    await queryInterface.addConstraint('partners', {
      fields: ['serviceTypeId'],
      type: 'foreign key',
      name: 'partners_serviceTypeId_fkey',
      references: {
        table: 'service_types',
        field: 'id'
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE'
    });

    // Update aadharImageId foreign key in partners table
    await queryInterface.removeConstraint('partners', 'partners_aadharImageId_fkey');
    await queryInterface.addConstraint('partners', {
      fields: ['aadharImageId'],
      type: 'foreign key',
      name: 'partners_aadharImageId_fkey',
      references: {
        table: 'files',
        field: 'id'
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE'
    });

    // Update additionalDocumentId foreign key in partners table
    await queryInterface.removeConstraint('partners', 'partners_additionalDocumentId_fkey');
    await queryInterface.addConstraint('partners', {
      fields: ['additionalDocumentId'],
      type: 'foreign key',
      name: 'partners_additionalDocumentId_fkey',
      references: {
        table: 'files',
        field: 'id'
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE'
    });

    // Update foreign keys in partner_services table
    await queryInterface.removeConstraint('partner_services', 'partner_services_partnerId_fkey');
    await queryInterface.addConstraint('partner_services', {
      fields: ['partnerId'],
      type: 'foreign key',
      name: 'partner_services_partnerId_fkey',
      references: {
        table: 'partners',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    await queryInterface.removeConstraint('partner_services', 'partner_services_serviceId_fkey');
    await queryInterface.addConstraint('partner_services', {
      fields: ['serviceId'],
      type: 'foreign key',
      name: 'partner_services_serviceId_fkey',
      references: {
        table: 'services',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  },

  async down(queryInterface, Sequelize) {
    // Revert all constraints to their original state
    // Remove and re-add with original settings
    const defaultSettings = {
      onDelete: 'NO ACTION',
      onUpdate: 'CASCADE'
    };

    await queryInterface.removeConstraint('partners', 'partners_userId_fkey');
    await queryInterface.addConstraint('partners', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'partners_userId_fkey',
      references: {
        table: 'users',
        field: 'id'
      },
      ...defaultSettings
    });

    await queryInterface.removeConstraint('partners', 'partners_serviceTypeId_fkey');
    await queryInterface.addConstraint('partners', {
      fields: ['serviceTypeId'],
      type: 'foreign key',
      name: 'partners_serviceTypeId_fkey',
      references: {
        table: 'service_types',
        field: 'id'
      },
      ...defaultSettings
    });

    await queryInterface.removeConstraint('partners', 'partners_aadharImageId_fkey');
    await queryInterface.addConstraint('partners', {
      fields: ['aadharImageId'],
      type: 'foreign key',
      name: 'partners_aadharImageId_fkey',
      references: {
        table: 'files',
        field: 'id'
      },
      ...defaultSettings
    });

    await queryInterface.removeConstraint('partners', 'partners_additionalDocumentId_fkey');
    await queryInterface.addConstraint('partners', {
      fields: ['additionalDocumentId'],
      type: 'foreign key',
      name: 'partners_additionalDocumentId_fkey',
      references: {
        table: 'files',
        field: 'id'
      },
      ...defaultSettings
    });

    await queryInterface.removeConstraint('partner_services', 'partner_services_partnerId_fkey');
    await queryInterface.addConstraint('partner_services', {
      fields: ['partnerId'],
      type: 'foreign key',
      name: 'partner_services_partnerId_fkey',
      references: {
        table: 'partners',
        field: 'id'
      },
      ...defaultSettings
    });

    await queryInterface.removeConstraint('partner_services', 'partner_services_serviceId_fkey');
    await queryInterface.addConstraint('partner_services', {
      fields: ['serviceId'],
      type: 'foreign key',
      name: 'partner_services_serviceId_fkey',
      references: {
        table: 'services',
        field: 'id'
      },
      ...defaultSettings
    });
  }
}; 