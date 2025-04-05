import { Request, Response } from "express";
import HistoryDao from "../../dao/history/historyDao";
import CommonRes from "../../utils/commonResponse";
import { resObj, User } from "../../utils/types";

interface HistoryRequest extends Request {
  body: {
    user: User;
  };
  query: {
    serviceType?: 'request' | 'accept';
    status?: 'requested' | 'pending' | 'completed' | 'cancelled';
    startDate?: string;
    endDate?: string;
    query?: string;
    page?: string;
    limit?: string;
    useRawQuery?: string;
  };
}

class HistoryController {
  private dao: HistoryDao;

  constructor() {
    this.dao = new HistoryDao();
  }

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
      const result = await this.dao.getUserServiceHistoryRaw(filters)
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

export default HistoryController; 