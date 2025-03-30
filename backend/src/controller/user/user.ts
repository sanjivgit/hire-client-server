import CommonRes from "../../utils/commonResponse";
import { resObj, User } from "../../utils/types";
import { Request, Response } from "express";
import UserDao from "../../dao/user/userDao";
import { updateUserValidation } from "../../requests/user/updateUserValidation";
import LoginDto from "../../dto/response/auth/loginDto";
import UserRequestDto from "../../dto/request/userDto/userRequestDto";

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
class UserController {
  private userDao: UserDao;
  
  constructor() {
    this.userDao = new UserDao();
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

      const loginDto = new LoginDto(userDetails);

      return CommonRes.SUCCESS(
        "User details retrieved successfully",
        loginDto,
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

      const userRequestDto = new UserRequestDto(details);

      // Validate request body
      const { error } = updateUserValidation.validate(userRequestDto);
      if (error) {
        return CommonRes.VALIDATION_ERROR(error, resObj, req, res);
      }

      const updatedUser = await this.userDao.updateUserDetails(
        String(userId),
        userRequestDto
      );

      if (!updatedUser) {
        return CommonRes.NOT_FOUND("User not found", null, resObj, req, res);
      }

      const loginDto = new LoginDto(updatedUser);

      return CommonRes.SUCCESS(
        "User details updated successfully",
        loginDto,
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
