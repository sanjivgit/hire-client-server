import { Request, Response } from "express";
import FcmTokenDao from "../../dao/user/fcmTokenDao";
import {
  storeFcmTokenValidation,
  updateTokenStatusValidation,
  deleteTokenValidation
} from "../../requests/user/fcmTokenValidation";
import CommonRes from "../../utils/commonResponse";
import { resObj } from "../../utils/types";
import FcmTokenDto from "../../dto/request/fcm/fcmTokenDto";
import FcmTokenResponseDto from "../../dto/response/fcm/fcmTokenDto";

class FcmTokenController {
  private dao: FcmTokenDao;

  constructor() {
    this.dao = new FcmTokenDao();
  }

  /**
   * Store or update FCM token for the authenticated user
   */
  storeToken = async (
    req: Request,
    res: Response,
    apiId: string
  ): Promise<any> => {
    const resObj: resObj = {
      apiId,
      action: "POST",
      version: "1.0",
    };
    
    try {
      // Extract user_id from auth token
      const userId = req.body.user?.id;
      if (!userId) {
        return CommonRes.UNAUTHORISED(
          "User authentication required",
          resObj,
          req,
          res
        );
      }

      // Parse and validate request
      const fcmTokenDto = new FcmTokenDto(req.body);
      const { error } = storeFcmTokenValidation.validate(fcmTokenDto);
      if (error) {
        return CommonRes.VALIDATION_ERROR(error, resObj, req, res);
      }

      // Store token
      const result = await this.dao.storeToken(
        userId,
        fcmTokenDto.token,
        fcmTokenDto.device_id
      );

      // Return response
      const responseData = new FcmTokenResponseDto(result);
      return CommonRes.SUCCESS(
        "FCM token stored successfully",
        responseData,
        resObj,
        req,
        res
      );
    } catch (error: any) {
      if (error.message === "User not found") {
        return CommonRes.NOT_FOUND(error.message, null, resObj, req, res);
      }
      return CommonRes.SERVER_ERROR(error, resObj, req, res);
    }
  };

  /**
   * Get all FCM tokens for the authenticated user
   */
  getTokens = async (
    req: Request,
    res: Response,
    apiId: string
  ): Promise<any> => {
    const resObj: resObj = {
      apiId,
      action: "GET",
      version: "1.0",
    };
    
    try {
      // Extract user_id from auth token
      const userId = req.body.user?.id;
      if (!userId) {
        return CommonRes.UNAUTHORISED(
          "User authentication required",
          resObj,
          req,
          res
        );
      }

      // Get tokens
      const tokens = await this.dao.getTokensByUserId(userId);
      
      // Format response
      const responseData = tokens.map(token => new FcmTokenResponseDto(token));
      
      return CommonRes.SUCCESS(
        "FCM tokens retrieved successfully",
        responseData,
        resObj,
        req,
        res
      );
    } catch (error: any) {
      return CommonRes.SERVER_ERROR(error, resObj, req, res);
    }
  };

  /**
   * Update FCM token status for the authenticated user
   */
  updateToken = async (
    req: Request,
    res: Response,
    apiId: string
  ): Promise<any> => {
    const resObj: resObj = {
      apiId,
      action: "PUT",
      version: "1.0",
    };
    
    try {
      // Extract user_id from auth token
      const userId = req.body.user?.id;
      if (!userId) {
        return CommonRes.UNAUTHORISED(
          "User authentication required",
          resObj,
          req,
          res
        );
      }

      // Validate request
      const { error } = updateTokenStatusValidation.validate(req.body);
      if (error) {
        return CommonRes.VALIDATION_ERROR(error, resObj, req, res);
      }

      // Update token status
      const result = await this.dao.updateTokenStatus(
        userId,
        req.body.token,
        req.body.is_active
      );

      // Return response
      const responseData = new FcmTokenResponseDto(result);
      return CommonRes.SUCCESS(
        "FCM token status updated successfully",
        responseData,
        resObj,
        req,
        res
      );
    } catch (error: any) {
      if (error.message === "Token not found for this user") {
        return CommonRes.NOT_FOUND(error.message, null, resObj, req, res);
      }
      return CommonRes.SERVER_ERROR(error, resObj, req, res);
    }
  };

  /**
   * Delete FCM token for the authenticated user
   */
  deleteToken = async (
    req: Request,
    res: Response,
    apiId: string
  ): Promise<any> => {
    const resObj: resObj = {
      apiId,
      action: "DELETE",
      version: "1.0",
    };
    
    try {
      // Extract user_id from auth token
      const userId = req.body.user?.id;
      if (!userId) {
        return CommonRes.UNAUTHORISED(
          "User authentication required",
          resObj,
          req,
          res
        );
      }

      // Validate request
      const { error } = deleteTokenValidation.validate(req.body);
      if (error) {
        return CommonRes.VALIDATION_ERROR(error, resObj, req, res);
      }

      // Delete token
      const success = await this.dao.deleteToken(userId, req.body.token);
      
      if (!success) {
        return CommonRes.NOT_FOUND(
          "Token not found for this user",
          null,
          resObj,
          req,
          res
        );
      }

      return CommonRes.SUCCESS(
        "FCM token deleted successfully",
        null,
        resObj,
        req,
        res
      );
    } catch (error: any) {
      return CommonRes.SERVER_ERROR(error, resObj, req, res);
    }
  };
}

export default FcmTokenController; 