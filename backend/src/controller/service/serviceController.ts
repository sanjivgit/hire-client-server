import { Request, Response } from "express";
import ServiceDao from "../../dao/service/serviceDao";
import {
  createServiceValidation,
  updateServiceValidation,
} from "../../requests/service/serviceValidation";
import CommonRes from "../../utils/commonResponse";
import { resObj } from "../../utils/types";
import ServiceDto from "../../dto/request/service/serviceDto";
import ServiceResponseDto from "../../dto/response/service/serviceDto";
import ServiceRequestDto from "../../dto/request/service/serviceDto";

class ServiceController {
  private dao: ServiceDao;

  constructor() {
    this.dao = new ServiceDao();
  }

  getAllServices = async (
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
      const services = await this.dao.getAllServices(search);

      
      const responseServices = services.map(
        (service: any) => new ServiceResponseDto(service.toJSON())
      );

      return CommonRes.SUCCESS(
        "Services retrieved successfully",
        responseServices,
        resObj,
        req,
        res
      );
    } catch (error: any) {
      return CommonRes.SERVER_ERROR(error, resObj, req, res);
    }
  };

  getServicesByTypeId = async (
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
      const serviceTypeId = parseInt(req.params.serviceTypeId);
      if (isNaN(serviceTypeId)) {
        return CommonRes.BAD_REQUEST(
          "Invalid service type ID",
          resObj,
          req,
          res
        );
      }

      const search = req.query.search as string | undefined;
      const services = await this.dao.getServicesByTypeId(
        serviceTypeId,
        search
      );

      const responseServices = services.map(
        (service: any) => new ServiceResponseDto(service.toJSON())
      );

      return CommonRes.SUCCESS(
        "Services retrieved successfully",
        responseServices,
        resObj,
        req,
        res
      );
    } catch (error: any) {
      return CommonRes.SERVER_ERROR(error, resObj, req, res);
    }
  };

  createService = async (
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

      const serviceDto = new ServiceRequestDto(others);

      // Validate request body
      const { error } = createServiceValidation.validate(serviceDto);
      if (error) {
        return CommonRes.VALIDATION_ERROR(error, resObj, req, res);
      }

      const service = await this.dao.createService(serviceDto);

      const responseService = new ServiceResponseDto(service);

      return CommonRes.SUCCESS(
        "Service created successfully",
        responseService,
        resObj,
        req,
        res
      );
    } catch (error: any) {
      return CommonRes.SERVER_ERROR(error, resObj, req, res);
    }
  };

  updateService = async (
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
        return CommonRes.BAD_REQUEST("Invalid service ID", resObj, req, res);
      }

      const { user, ...others } = req.body;

      const serviceDto = new ServiceRequestDto(others);

      // Validate request body
      const { error } = updateServiceValidation.validate(serviceDto);
      if (error) {
        return CommonRes.VALIDATION_ERROR(error, resObj, req, res);
      }

      const service = await this.dao.updateService(id, serviceDto);

      const responseService = new ServiceResponseDto(service);

      if (!service) {
        return CommonRes.SUCCESS("Service not found", null, resObj, req, res);
      }

      return CommonRes.SUCCESS(
        "Service updated successfully",
        responseService,
        resObj,
        req,
        res
      );
    } catch (error: any) {
      return CommonRes.SERVER_ERROR(error, resObj, req, res);
    }
  };

  deleteService = async (
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
        return CommonRes.BAD_REQUEST("Invalid service ID", resObj, req, res);
      }

      const deleted = await this.dao.deleteService(id);

      if (!deleted) {
        return CommonRes.SUCCESS("Service not found", null, resObj, req, res);
      }

      return CommonRes.SUCCESS(
        "Service deleted successfully",
        null,
        resObj,
        req,
        res
      );
    } catch (error: any) {
      return CommonRes.SERVER_ERROR(error, resObj, req, res);
    }
  };

  getServiceById = async (
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
        return CommonRes.BAD_REQUEST("Invalid service ID", resObj, req, res);
      }

      const service = await this.dao.getServiceById(id);

      const responseService = new ServiceResponseDto(service);

      if (!service) {
        return CommonRes.SUCCESS("Service not found", null, resObj, req, res);
      }

      return CommonRes.SUCCESS(
        "Service retrieved successfully",
        responseService,
        resObj,
        req,
        res
      );
    } catch (error: any) {
      return CommonRes.SERVER_ERROR(error, resObj, req, res);
    }
  };
}

export default ServiceController;
