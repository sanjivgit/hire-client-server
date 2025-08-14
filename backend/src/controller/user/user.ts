import CommonRes from "../../utils/commonResponse";
import { resObj, User } from "../../utils/types";
import { Request, Response } from "express";
import UserDao from "../../dao/user/userDao";
import { updateUserValidation } from "../../requests/user/updateUserValidation";
import LoginDto from "../../dto/response/auth/loginDto";
import UserRequestDto from "../../dto/request/userDto/userRequestDto";
import UserDto from "../../dto/response/auth/userDto";
import HistoryDao from "../../dao/history/historyDao";
import { HistoryRequest } from "../history/historyController";

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
  private historyDao: HistoryDao;

  constructor() {
    this.userDao = new UserDao();
    this.historyDao = new HistoryDao();
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

  getUserList = async (
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
      const { query, limit = 10, page = 1 } = req.query

      const result = await this.userDao.getUserList({ query, limit, page });

      const { data, ...pagination } = result;

      if (!data.length) {
        return CommonRes.SUCCESS("User not found", { users: [] }, resObj, req, res);
      }

      let users: any = data.map((user: any) => new UserDto(user));

      return CommonRes.SUCCESS(
        "User list retrieved successfully",
        {
          users,
          pagination
        },
        resObj,
        req,
        res
      );
    } catch (error: any) {
      return CommonRes.SERVER_ERROR(error, resObj, req, res);
    }
  };

  getUserServiceHistory = async (
    req: HistoryRequest,
    res: Response,
    apiId: string
  ): Promise<any> => {
    const resObj: resObj = {
      apiId,
      action: "GET",
      version: "1.0",
    };

    try {
      const { user } = req.body;
      const userId = user?.id;

      if (!userId) {
        return CommonRes.UNAUTHORISED(
          "User not authenticated",
          resObj,
          req,
          res
        );
      }

      // Parse query parameters
      const filters = {
        userId,
        serviceType: req.query.serviceType,
        status: req.query.status,
        startDate: req.query.startDate ? new Date(req.query.startDate) : undefined,
        endDate: req.query.endDate ? new Date(req.query.endDate) : undefined,
        query: req.query.query,
        page: req.query.page ? parseInt(req.query.page) : 1,
        limit: req.query.limit ? parseInt(req.query.limit) : 10
      };

      // Check for invalid date parameters
      if (
        (filters.startDate && isNaN(filters.startDate.getTime())) ||
        (filters.endDate && isNaN(filters.endDate.getTime()))
      ) {
        return CommonRes.BAD_REQUEST(
          "Invalid date format. Please use ISO format (YYYY-MM-DD)",
          resObj,
          req,
          res
        );
      }

      // Check if we should use raw query implementation (for testing/comparison)
      const useRawQuery = req.query.useRawQuery === 'true';

      // Get service history
      const result = await this.historyDao.getUserServiceHistoryRaw(filters)
      // : await this.dao.getUserServiceHistory(filters);

      // Prepare pagination metadata
      const pagination = {
        currentPage: filters.page,
        totalPages: Math.ceil(result.count / filters.limit),
        totalItems: result.count,
        itemsPerPage: filters.limit
      };

      return CommonRes.SUCCESS(
        "Service history retrieved successfully",
        {
          items: result.rows,
          pagination
        },
        resObj,
        req,
        res
      );
    } catch (error: any) {
      console.error('Error in getUserServiceHistory:', error);
      return CommonRes.SERVER_ERROR(error, resObj, req, res);
    }
  };
}


export default UserController;
