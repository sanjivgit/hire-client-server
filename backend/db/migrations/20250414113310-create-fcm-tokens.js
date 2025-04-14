'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('fcm_tokens', {
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
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      token: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      device_id: {
        type: Sequelize.STRING(128),
        allowNull: true
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
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

    // Add indexes for performance
    await queryInterface.addIndex('fcm_tokens', ['user_id'], {
      name: 'fcm_tokens_user_id_idx'
    });
    await queryInterface.addIndex('fcm_tokens', ['token'], {
      name: 'fcm_tokens_token_idx'
    });
    await queryInterface.addIndex('fcm_tokens', ['device_id'], {
      name: 'fcm_tokens_device_id_idx'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('fcm_tokens');
  }
}; 