import { Request, Response } from "express";
import ServiceTypeDao from "../../dao/serviceType/serviceTypeDao";
import {
  createServiceTypeValidation,
  updateServiceTypeValidation,
} from "../../requests/serviceType/serviceTypeValidation";
import CommonRes from "../../utils/commonResponse";
import { resObj } from "../../utils/types";
import { ServiceTypeResponseDto } from "../../dto/response/serviceType/serviceTypeResponseDto";

class ServiceTypeController {
  private dao: ServiceTypeDao;

  constructor() {
    this.dao = new ServiceTypeDao();
  }

  getAllServiceTypes = async (
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
      const search = req.query.search as string | undefined;
      const serviceTypesData = await this.dao.getAllServiceTypes(search);
      
      // Transform to DTO using static helper method
      const serviceTypes = ServiceTypeResponseDto.transformList(serviceTypesData);

      return CommonRes.SUCCESS(
        "Service types retrieved successfully",
        serviceTypes,
        resObj,
        req,
        res
      );
    } catch (error: any) {
      return CommonRes.SERVER_ERROR(error, resObj, req, res);
    }
  };

  createServiceType = async (
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
      const { user, ...others } = req.body;
      // Validate request body
      const { error } = createServiceTypeValidation.validate(others);
      if (error) {
        return CommonRes.VALIDATION_ERROR(error, resObj, req, res);
      }

      const serviceTypeData = await this.dao.createServiceType(req.body);
      
      // Transform to DTO
      const serviceType = new ServiceTypeResponseDto(serviceTypeData);

      return CommonRes.SUCCESS(
        "Service type created successfully",
        serviceType,
        resObj,
        req,
        res
      );
    } catch (error: any) {
      return CommonRes.SERVER_ERROR(error, resObj, req, res);
    }
  };

  updateServiceType = async (
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
          "Invalid service type ID",
          resObj,
          req,
          res
        );
      }

      const { user, ...others } = req.body;

      // Validate request body
      const { error } = updateServiceTypeValidation.validate(others);
      if (error) {
        return CommonRes.VALIDATION_ERROR(error, resObj, req, res);
      }

      const serviceTypeData = await this.dao.updateServiceType(id, req.body);
      if (!serviceTypeData) {
        return CommonRes.SUCCESS(
          "Service type not found",
          null,
          resObj,
          req,
          res
        );
      }
      
      // Transform to DTO
      const serviceType = new ServiceTypeResponseDto(serviceTypeData);

      return CommonRes.SUCCESS(
        "Service type updated successfully",
        serviceType,
        resObj,
        req,
        res
      );
    } catch (error: any) {
      return CommonRes.SERVER_ERROR(error, resObj, req, res);
    }
  };

  deleteServiceType = async (
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
          "Invalid service type ID",
          resObj,
          req,
          res
        );
      }

      const deleted = await this.dao.deleteServiceType(id);
      if (!deleted) {
        return CommonRes.SUCCESS(
          "Service type not found",
          null,
          resObj,
          req,
          res
        );
      }

      return CommonRes.SUCCESS(
        "Service type deleted successfully",
        deleted,
        resObj,
        req,
        res
      );
    } catch (error: any) {
      return CommonRes.SERVER_ERROR(error, resObj, req, res);
    }
  };

  getServiceTypeById = async (
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
          "Invalid service type ID",
          resObj,
          req,
          res
        );
      }

      const serviceTypeData = await this.dao.getServiceTypeById(id);
      if (!serviceTypeData) {
        return CommonRes.SUCCESS(
          "Service type not found",
          null,
          resObj,
          req,
          res
        );
      }
      
      // Transform to DTO
      const serviceType = new ServiceTypeResponseDto(serviceTypeData);

      return CommonRes.SUCCESS(
        "Service type retrieved successfully",
        serviceType,
        resObj,
        req,
        res
      );
    } catch (error: any) {
      return CommonRes.SERVER_ERROR(error, resObj, req, res);
    }
  };

  getServiceTypesWithLimitedServices = async (
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
      // Get the limit from query params, default to 4 if not provided
      const servicesLimit = req.query.limit ? 
        parseInt(req.query.limit as string) : 4;
      
      // Validate the limit
      if (isNaN(servicesLimit) || servicesLimit < 1) {
        return CommonRes.BAD_REQUEST(
          "Invalid services limit. Must be a positive number.",
          resObj,
          req,
          res
        );
      }

      // Cap the limit at 10 to prevent excessive data retrieval
      const limitToUse = Math.min(servicesLimit, 10);
      
      const serviceTypesData = await this.dao.getServiceTypesWithLimitedServices(limitToUse);
      
      // Transform to DTO using static helper method
      const serviceTypes = ServiceTypeResponseDto.transformList(serviceTypesData);

      return CommonRes.SUCCESS(
        "Service types with limited services retrieved successfully",
        serviceTypes,
        resObj,
        req,
        res
      );
    } catch (error: any) {
      return CommonRes.SERVER_ERROR(error, resObj, req, res);
    }
  };
}

export default ServiceTypeController;
