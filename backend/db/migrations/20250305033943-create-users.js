'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      profile_pic: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'files',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      token: {
        type: Sequelize.STRING(500),
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
          isEmail: true,
        },
      },
      address: {
        type: Sequelize.JSON,
        allowNull: true,
        defaultValue: {
          address: "",
          pin_code: "",
          state: "",
          district: "",
        },
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
    await queryInterface.dropTable('users');
  }
};