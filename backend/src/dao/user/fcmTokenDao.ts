const db = require("../../../db/models/index");
import { Op } from "sequelize";

class FcmTokenDao {
  private users: any;
  private fcmTokens: any;

  constructor() {
    this.users = db.users;
    this.fcmTokens = db.fcm_tokens;
  }

  /**
   * Store or update FCM token for a user
   * @param userId User ID
   * @param token FCM token
   * @param deviceId Device identifier (optional)
   * @returns Created or updated token record
   */
  storeToken = async (
    userId: number,
    token: string,
    deviceId?: string
  ): Promise<any> => {
    try {
      // Check if user exists
      const user = await this.users.findByPk(userId);
      if (!user) {
        throw new Error("User not found");
      }

      let tokenRecord;
      
      // If deviceId is provided, try to find an existing record for this device
      if (deviceId) {
        tokenRecord = await this.fcmTokens.findOne({
          where: {
            user_id: userId,
            device_id: deviceId
          }
        });
      }
      
      // If no deviceId or no record found for this device, try to find by token
      if (!tokenRecord) {
        tokenRecord = await this.fcmTokens.findOne({
          where: {
            user_id: userId,
            token: token
          }
        });
      }

      // If record exists, update it
      if (tokenRecord) {
        tokenRecord.token = token;
        if (deviceId) {
          tokenRecord.device_id = deviceId;
        }
        await tokenRecord.save();
        return tokenRecord;
      }

      // Create new token record
      return await this.fcmTokens.create({
        user_id: userId,
        token: token,
        device_id: deviceId || null,
        is_active: true,
        created_at: new Date(),
        updated_at: new Date()
      });
    } catch (error) {
      console.error("Error in storeToken DAO:", error);
      throw error;
    }
  };

  /**
   * Get all active FCM tokens for a user
   * @param userId User ID
   * @returns Array of FCM token records
   */
  getTokensByUserId = async (userId: number): Promise<any[]> => {
    try {
      return await this.fcmTokens.findAll({
        where: {
          user_id: userId,
          is_active: true
        }
      });
    } catch (error) {
      console.error("Error in getTokensByUserId DAO:", error);
      throw error;
    }
  };

  /**
   * Update FCM token status (active/inactive)
   * @param userId User ID
   * @param token FCM token
   * @param isActive Status to set
   * @returns Updated token record
   */
  updateTokenStatus = async (
    userId: number,
    token: string,
    isActive: boolean
  ): Promise<any> => {
    try {
      const tokenRecord = await this.fcmTokens.findOne({
        where: {
          user_id: userId,
          token: token
        }
      });

      if (!tokenRecord) {
        throw new Error("Token not found for this user");
      }

      tokenRecord.is_active = isActive;
      tokenRecord.updated_at = new Date();
      await tokenRecord.save();
      return tokenRecord;
    } catch (error) {
      console.error("Error in updateTokenStatus DAO:", error);
      throw error;
    }
  };

  /**
   * Delete FCM token
   * @param userId User ID
   * @param token FCM token
   * @returns Success status
   */
  deleteToken = async (userId: number, token: string): Promise<boolean> => {
    try {
      const result = await this.fcmTokens.destroy({
        where: {
          user_id: userId,
          token: token
        }
      });
      return result > 0;
    } catch (error) {
      console.error("Error in deleteToken DAO:", error);
      throw error;
    }
  };
}

export default FcmTokenDao; 