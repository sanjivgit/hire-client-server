import CommonRes from "../../utils/commonResponse";
import { resObj, User } from "../../utils/types";
import { Request, Response } from "express";
import UserDao from "../../dao/user/userDao";
import { updateUserValidation } from "../../requests/user/updateUserValidation";
import { partnerRegistrationValidation } from "../../requests/user/partnerRegistrationValidation";

/**
 * | Author- Sanjiv Kumar
 * | Created for- USER
 * | Created Date- 10-03-2025
 * | Status - Done
 */

interface AuthenticatedRequest extends Request {
  body: {
    user?: User;
  };
}
interface PartnerRegistrationRequest extends Request {
  body: {
    user: User;
    firstName: string;
    lastName: string;
    serviceIds: number[];
    serviceTypeId: number;
    aadharNumber: string;
    aadharImageId: number;
    additionalDocumentId: number;
  };
}
class UserController {
  private userDao: UserDao;
  private initMsg: string;
  constructor() {
    this.userDao = new UserDao();
    this.initMsg = "User";
  }

  getUserDetails = async (
    req: AuthenticatedRequest,
    res: Response,
    apiId: string
  ): Promise<any> => {
    const resObj: resObj = {
      apiId,
      action: "GET",
      version: "1.0",
    };

    try {
      const userId = req.body.user?.id;

      if (!userId) {
        return CommonRes.UNAUTHORISED(
          "User not authenticated",
          resObj,
          req,
          res
        );
      }

      const userDetails = await this.userDao.getUserByUserId(String(userId));

      if (!userDetails) {
        return CommonRes.NOT_FOUND("User not found", null, resObj, req, res);
      }

      return CommonRes.SUCCESS(
        "User details retrieved successfully",
        userDetails,
        resObj,
        req,
        res
      );
    } catch (error: any) {
      return CommonRes.SERVER_ERROR(error, resObj, req, res);
    }
  };

  updateUserDetails = async (
    req: AuthenticatedRequest,
    res: Response,
    apiId: string
  ): Promise<any> => {
    const resObj: resObj = {
      apiId,
      action: "PUT",
      version: "1.0",
    };

    try {
      const { user, ...details } = req.body;
      const userId = user?.id;

      if (!userId) {
        return CommonRes.UNAUTHORISED(
          "User not authenticated",
          resObj,
          req,
          res
        );
      }

      // Validate request body
      const { error } = updateUserValidation.validate(details);
      if (error) {
        return CommonRes.VALIDATION_ERROR(error, resObj, req, res);
      }

      const updatedUser = await this.userDao.updateUserDetails(
        String(userId),
        details
      );

      if (!updatedUser) {
        return CommonRes.NOT_FOUND("User not found", null, resObj, req, res);
      }

      return CommonRes.SUCCESS(
        "User details updated successfully",
        updatedUser,
        resObj,
        req,
        res
      );
    } catch (error: any) {
      return CommonRes.SERVER_ERROR(error, resObj, req, res);
    }
  };

  becomePartner = async (
    req: PartnerRegistrationRequest,
    res: Response,
    apiId: string
  ): Promise<any> => {
    const resObj: resObj = {
      apiId,
      action: "POST",
      version: "1.0",
    };

    try {
      const { user, ...details } = req.body;
      const userId = user?.id;

      if (!userId) {
        return CommonRes.UNAUTHORISED(
          "User not authenticated",
          resObj,
          req,
          res
        );
      }

      // Validate request body
      const { error } = partnerRegistrationValidation.validate(details);
      if (error) {
        return CommonRes.VALIDATION_ERROR(error, resObj, req, res);
      }

      const partner = await this.userDao.becomePartner({ ...details, userId });

      return CommonRes.SUCCESS(
        "Partner created successfully",
        partner,
        resObj,
        req,
        res
      );
    } catch (error: any) {
      return CommonRes.SERVER_ERROR(error, resObj, req, res);
    }
  };
}

export default UserController;
