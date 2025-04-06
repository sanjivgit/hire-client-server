import { Request, Response } from "express";
import NotificationsDao from "../../dao/notifications/notificationsDao";
import CommonRes from "../../utils/commonResponse";
import { resObj } from "../../utils/types";

class NotificationsController {
  private dao: NotificationsDao;

  constructor() {
    this.dao = new NotificationsDao();
  }

  /**
   * Get notifications for the authenticated user based on location and their own service requests
   */
  getNotifications = async (
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
      // Extract the user from the request
      const userId = req.body.user?.id;

      if (!userId) {
        return CommonRes.UNAUTHORISED(
          "User not authenticated",
          resObj,
          req,
          res
        );
      }

      // Parse query parameters
      const page = req.query.page ? parseInt(req.query.page as string) : 1;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

      // Validate pagination parameters
      if (isNaN(page) || page < 1 || isNaN(limit) || limit < 1 || limit > 50) {
        return CommonRes.BAD_REQUEST(
          "Invalid pagination parameters. Page must be >= 1 and limit must be between 1 and 50.",
          resObj,
          req,
          res
        );
      }

      // Get notifications from DAO
      const result = await this.dao.getNotifications(userId, page, limit);

      // Prepare pagination metadata
      const pagination = {
        currentPage: page,
        totalPages: Math.ceil(result.count / limit),
        totalItems: result.count,
        itemsPerPage: limit
      };

      // Return successful response
      return CommonRes.SUCCESS(
        "Notifications retrieved successfully",
        {
          notifications: result.rows,
          pagination
        },
        resObj,
        req,
        res
      );
    } catch (error: any) {
      console.error('Error in getNotifications controller:', error);
      return CommonRes.SERVER_ERROR(error, resObj, req, res);
    }
  };
}

export default NotificationsController; 