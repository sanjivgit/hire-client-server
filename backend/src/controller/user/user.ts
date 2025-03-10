import CommonRes from "../../utils/commonResponse";
import { resObj } from "../../utils/types";
import { resMessage } from "../../responseMessage/commonMessage";
import AuthDao from "../../dao/auth/authDao";
import { Request, Response } from "express";
import UserDao from "../../dao/user/userDao";

/**
 * | Author- Sanjiv Kumar
 * | Created for- USER
 * | Created Date- 10-03-2025
 * | Status - Done
 */

interface AuthenticatedRequest extends Request {
  user?: {
    userId: number;
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
      const { id: userId } = req.body.user;
      const userDetails = await this.userDao.getUserByUserId(userId);

      if (!userDetails) {
        return CommonRes.NOT_FOUND(
          "User not found",
          null,
          resObj,
          req,
          res
        );
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
}

export default UserController;
