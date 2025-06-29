import { Request, Response } from "express";
import AcceptedServiceDao from "../../dao/acceptedService/acceptedServiceDao";
import AcceptedServiceDto from "../../dto/request/acceptedService/acceptedServiceDto";
import AcceptedServiceResponseDto from "../../dto/response/acceptedService/acceptedServiceResponseDto";
import CommonRes from "../../utils/commonResponse";
import { createAcceptedServiceValidation, updateAcceptedServiceValidation, dateRangeValidation } from "../../requests/acceptedService/acceptedServiceValidation";
import { resObj } from "../../utils/types";

class AcceptedServiceController {
  private dao: AcceptedServiceDao;

  constructor() {
    this.dao = new AcceptedServiceDao();
  }

  // 1. API to accept a service request
  acceptServiceRequest = async (
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
      // Extract partner_id from auth token
      const partner_id = req.body.user?.partner?.id;
      if (!partner_id) {
        return CommonRes.UNAUTHORISED(
          "You must be a service partner to accept requests",
          resObj,
          req,
          res
        );
      }

      console.log("partner >>>>", req.body)
      // Create a merged data object with both the request body and user info
      const requestData = {
        ...req.body,
        user: req.body.user,
      };

      const acceptedServiceDto = new AcceptedServiceDto(requestData);

      // Make sure partner_id is set from the token
      acceptedServiceDto.partner_id = partner_id;

      // Validate request body
      const { error } = createAcceptedServiceValidation.validate(acceptedServiceDto);
      if (error) {
        return CommonRes.VALIDATION_ERROR(error, resObj, req, res);
      }

      const isExisting = await this.dao.isAcceptedAlready(acceptedServiceDto.service_request_id)

      if (isExisting) {
        return CommonRes.CONFLICT_ERROR(
          "This service request has already been accepted",
          resObj,
          req,
          res
        );
      }

      // Create the accepted service
      const acceptedService = await this.dao.createAcceptedService(acceptedServiceDto);

      const responseData = new AcceptedServiceResponseDto(acceptedService.toJSON());

      return CommonRes.SUCCESS(
        "Service request accepted successfully",
        responseData,
        resObj,
        req,
        res
      );
    } catch (error: any) {
      return CommonRes.SERVER_ERROR(error, resObj, req, res);
    }
  };

  // 2. API to update status and amount of an accepted service
  updateAcceptedService = async (
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
      console.log("Hello >>>>", req.body)
      // Extract partner_id from auth token
      const partner_id = req.body.user?.partner?.id;
      if (!partner_id) {
        return CommonRes.UNAUTHORISED(
          "You must be a service partner to update service status",
          resObj,
          req,
          res
        );
      }

      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return CommonRes.BAD_REQUEST(
          "Invalid accepted service ID",
          resObj,
          req,
          res
        );
      }

      const body = {
        status: req.body.status,
        description: req.body.description,
        amount: req.body.amount
      }

      // Validate request body
      const { error } = updateAcceptedServiceValidation.validate(body);
      if (error) {
        return CommonRes.VALIDATION_ERROR(error, resObj, req, res);
      }

      // Update the accepted service
      const updatedService = await this.dao.updateAcceptedService(
        id,
        partner_id,
        body
      );

      if (!updatedService) {
        return CommonRes.NOT_FOUND(
          "Accepted service not found or you don't have permission to update it",
          null,
          resObj,
          req,
          res
        );
      }

      const responseData = new AcceptedServiceResponseDto(updatedService.toJSON());

      return CommonRes.SUCCESS(
        "Accepted service updated successfully",
        responseData,
        resObj,
        req,
        res
      );
    } catch (error: any) {
      return CommonRes.SERVER_ERROR(error, resObj, req, res);
    }
  };

  // 3. API to get all accepted services by partner ID
  getAcceptedServicesByPartnerId = async (
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
      // Extract partner_id from auth token
      const partner_id = req.body.user?.partner?.id;
      if (!partner_id) {
        return CommonRes.UNAUTHORISED(
          "You must be a service partner to view accepted services",
          resObj,
          req,
          res
        );
      }

      const acceptedServices = await this.dao.getAcceptedServicesByPartnerId(partner_id);
      const responseData = acceptedServices.map(
        (service: any) => new AcceptedServiceResponseDto(service.toJSON())
      );

      return CommonRes.SUCCESS(
        "Accepted services retrieved successfully",
        responseData,
        resObj,
        req,
        res
      );
    } catch (error: any) {
      return CommonRes.SERVER_ERROR(error, resObj, req, res);
    }
  };

  // 4. API to get all accepted services with filters
  getAllAcceptedServices = async (
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
      // Check if user is authenticated
      const user = req.body.user;
      if (!user?.id) {
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

      if (req.query.partner_id) {
        filters.partner_id = parseInt(req.query.partner_id as string);
      }

      if (req.query.user_id) {
        filters.user_id = parseInt(req.query.user_id as string);
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

      // If user is not admin, restrict to their partner ID
      if (user.role !== 'admin' && user.partner?.id) {
        filters.partner_id = user.partner.id;
      }

      const acceptedServices = await this.dao.getAllAcceptedServices(filters);
      const responseData = acceptedServices.map(
        (service: any) => new AcceptedServiceResponseDto(service.toJSON())
      );

      return CommonRes.SUCCESS(
        "Accepted services retrieved successfully",
        responseData,
        resObj,
        req,
        res
      );
    } catch (error: any) {
      return CommonRes.SERVER_ERROR(error, resObj, req, res);
    }
  };

  // 5. API to get an accepted service by ID
  getAcceptedServiceById = async (
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
          "Invalid accepted service ID",
          resObj,
          req,
          res
        );
      }

      const acceptedService = await this.dao.getAcceptedServiceById(id);

      if (!acceptedService) {
        return CommonRes.SUCCESS("Accepted service not found", null, resObj, req, res);
      }

      // If user is not admin, check if they have access (their partner ID)
      const user = req.body.user;
      if (user.role !== 'admin' && user.partner?.id !== acceptedService.partner_id) {
        return CommonRes.UNAUTHORISED(
          "You don't have permission to view this accepted service",
          resObj,
          req,
          res
        );
      }

      const responseData = new AcceptedServiceResponseDto(acceptedService.toJSON());

      return CommonRes.SUCCESS(
        "Accepted service retrieved successfully",
        responseData,
        resObj,
        req,
        res
      );
    } catch (error: any) {
      return CommonRes.SERVER_ERROR(error, resObj, req, res);
    }
  };
}

export default AcceptedServiceController; 