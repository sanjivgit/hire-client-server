'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class fcm_tokens extends Model {
    static associate(models) {
      // Define association with users
      fcm_tokens.belongsTo(models.users, {
        foreignKey: 'user_id',
        as: 'user',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }
  
  fcm_tokens.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    token: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    device_id: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'fcm_tokens',
    tableName: 'fcm_tokens',
    timestamps: false,
    indexes: [
      {
        name: 'fcm_tokens_user_id_idx',
        using: 'BTREE',
        fields: ['user_id']
      },
      {
        name: 'fcm_tokens_token_idx',
        using: 'BTREE',
        fields: ['token']
      },
      {
        name: 'fcm_tokens_device_id_idx',
        using: 'BTREE',
        fields: ['device_id']
      }
    ]
  });
  
  return fcm_tokens;
}; 