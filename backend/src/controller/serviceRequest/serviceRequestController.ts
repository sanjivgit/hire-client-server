import { Request, Response } from "express";
import ServiceRequestDao from "../../dao/serviceRequest/serviceRequestDao";
import {
  createServiceRequestValidation,
  updateServiceRequestValidation,
  dateRangeValidation,
} from "../../requests/serviceRequest/serviceRequestValidation";
import CommonRes from "../../utils/commonResponse";
import { resObj } from "../../utils/types";
import ServiceRequestDto from "../../dto/request/serviceRequest/serviceRequestDto";
import ServiceRequestResponseDto from "../../dto/response/serviceRequest/serviceRequestDto";

class ServiceRequestController {
  private dao: ServiceRequestDao;

  constructor() {
    this.dao = new ServiceRequestDao();
  }

  createServiceRequest = async (
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
      // Extract user_id from auth token (available in req.body.user)
      const userDetails = req.body.user;
      const user_id = userDetails?.id;
      if (!user_id) {
        return CommonRes.UNAUTHORISED(
          "User authentication required",
          resObj,
          req,
          res
        );
      }

      const serviceRequestDto = new ServiceRequestDto(req.body);

      // Validate request body
      const { error } = createServiceRequestValidation.validate(serviceRequestDto);
      if (error) {
        return CommonRes.VALIDATION_ERROR(error, resObj, req, res);
      }

      const isRequestedAlready = await this.dao.checkDuplicateServiceRequest(userDetails?.id, serviceRequestDto.service_id)

      if (isRequestedAlready) {
        return CommonRes.CONFLICT_ERROR('You have already requested for this service. Now after 24 hour again able to request.', resObj, req, res);
      }

      const serviceRequest = await this.dao.createServiceRequest(serviceRequestDto, { city: userDetails?.address?.city, pincode: userDetails?.address?.pincode });

      const responseData = new ServiceRequestResponseDto(serviceRequest.toJSON());

      return CommonRes.SUCCESS(
        "Service request created successfully",
        responseData,
        resObj,
        req,
        res
      );
    } catch (error: any) {
      return CommonRes.SERVER_ERROR(error, resObj, req, res);
    }
  };

  deleteServiceRequest = async (
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
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return CommonRes.BAD_REQUEST(
          "Invalid service request ID",
          resObj,
          req,
          res
        );
      }

      // Ensure the user can only delete their own requests
      const user_id = req.body.user?.id;
      const serviceRequest = await this.dao.getServiceRequestById(id);

      if (!serviceRequest) {
        return CommonRes.SUCCESS("Service request not found", null, resObj, req, res);
      }

      if (serviceRequest.user_id !== user_id) {
        return CommonRes.UNAUTHORISED(
          "You are not authorized to delete this service request",
          resObj,
          req,
          res
        );
      }

      const deleted = await this.dao.deleteServiceRequest(id);

      if (!deleted) {
        return CommonRes.SUCCESS("Service request not found", null, resObj, req, res);
      }

      return CommonRes.SUCCESS(
        "Service request deleted successfully",
        null,
        resObj,
        req,
        res
      );
    } catch (error: any) {
      return CommonRes.SERVER_ERROR(error, resObj, req, res);
    }
  };

  getServiceRequestsByUserId = async (
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
      const user_id = req.body.user?.id;
      if (!user_id) {
        return CommonRes.UNAUTHORISED(
          "User authentication required",
          resObj,
          req,
          res
        );
      }

      const serviceRequests = await this.dao.getServiceRequestsByUserId(user_id);
      const responseData = serviceRequests.map(
        (request: any) => new ServiceRequestResponseDto(request.toJSON())
      );

      return CommonRes.SUCCESS(
        "Service requests retrieved successfully",
        responseData,
        resObj,
        req,
        res
      );
    } catch (error: any) {
      return CommonRes.SERVER_ERROR(error, resObj, req, res);
    }
  };

  getAllServiceRequests = async (
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
      // Check if user is admin
      const user = req.body.user;
      if (!user.id) {
        return CommonRes.UNAUTHORISED(
          "User authentication required",
          resObj,
          req,
          res
        );
      }

      // Parse filters from query parameters
      const filters: any = {};

      if (req.query.start_date) {
        filters.start_date = new Date(req.query.start_date as string);
      }

      if (req.query.end_date) {
        filters.end_date = new Date(req.query.end_date as string);
      }

      if (req.query.service_id) {
        filters.service_id = parseInt(req.query.service_id as string);
      }

      if (req.query.status) {
        filters.status = req.query.status as string;
      }

      // Validate date range if provided
      if (filters.start_date || filters.end_date) {
        const { error } = dateRangeValidation.validate({
          start_date: filters.start_date,
          end_date: filters.end_date
        });

        if (error) {
          return CommonRes.VALIDATION_ERROR(error, resObj, req, res);
        }
      }

      const serviceRequests = await this.dao.getAllServiceRequests(filters);
      const responseData = serviceRequests.map(
        (request: any) => new ServiceRequestResponseDto(request.toJSON())
      );

      return CommonRes.SUCCESS(
        "Service requests retrieved successfully",
        responseData,
        resObj,
        req,
        res
      );
    } catch (error: any) {
      return CommonRes.SERVER_ERROR(error, resObj, req, res);
    }
  };

  getServiceRequestById = async (
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
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return CommonRes.BAD_REQUEST(
          "Invalid service request ID",
          resObj,
          req,
          res
        );
      }

      const serviceRequest = await this.dao.getServiceRequestById(id);

      if (!serviceRequest) {
        return CommonRes.SUCCESS("Service request not found", null, resObj, req, res);
      }

      const responseData = new ServiceRequestResponseDto(serviceRequest.toJSON());

      return CommonRes.SUCCESS(
        "Service request retrieved successfully",
        responseData,
        resObj,
        req,
        res
      );
    } catch (error: any) {
      return CommonRes.SERVER_ERROR(error, resObj, req, res);
    }
  };

  cancelServiceRequest = async (
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
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return CommonRes.BAD_REQUEST(
          "Invalid service request ID",
          resObj,
          req,
          res
        );
      }

      // Validate request body
      const { error } = updateServiceRequestValidation.validate(req.body);
      if (error) {
        return CommonRes.VALIDATION_ERROR(error, resObj, req, res);
      }

      // Update the accepted service
      const updatedService = await this.dao.cancelServiceRequest(
        id,
        {
          status: 'cancelled',
          description: req.body.description
        }
      );

      if (!updatedService) {
        return CommonRes.NOT_FOUND(
          "Service request not found or you don't have permission to update it",
          null,
          resObj,
          req,
          res
        );
      }

      return CommonRes.SUCCESS(
        "Service request updated successfully",
        '',
        resObj,
        req,
        res
      );
    } catch (error: any) {
      return CommonRes.SERVER_ERROR(error, resObj, req, res);
    }
  };
}

export default ServiceRequestController; 