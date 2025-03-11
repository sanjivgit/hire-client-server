import { Request, Response } from "express";
import ServiceTypeDao from "../../dao/serviceType/serviceTypeDao";
import {
  createServiceTypeValidation,
  updateServiceTypeValidation,
} from "../../requests/serviceType/serviceTypeValidation";
import CommonRes from "../../utils/commonResponse";
import { resObj } from "../../utils/types";

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
      const serviceTypes = await this.dao.getAllServiceTypes(search);

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

      const serviceType = await this.dao.createServiceType(req.body);

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

      const serviceType = await this.dao.updateServiceType(id, req.body);
      if (!serviceType) {
        return CommonRes.SUCCESS(
          "Service type not found",
          null,
          resObj,
          req,
          res
        );
      }

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

      const serviceType = await this.dao.getServiceTypeById(id);
      if (!serviceType) {
        return CommonRes.SUCCESS(
          "Service type not found",
          null,
          resObj,
          req,
          res
        );
      }

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
}

export default ServiceTypeController;
