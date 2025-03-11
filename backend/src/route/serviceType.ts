import express, { NextFunction, Request, Response } from "express";
import { baseUrl } from "../utils/common";
import ServiceTypeController from "../controller/serviceType/serviceTypeController";
import Authorization from "../middleware/auth";

class ServiceTypeRoute {
  private serviceTypeController: ServiceTypeController;
  private authorization: Authorization;
  constructor() {
    this.serviceTypeController = new ServiceTypeController();
    this.authorization = new Authorization();
  }

  configure(app: express.Application, apiId: string) {
    app.route(`${baseUrl}/service-types`).get(
      (req: Request, res: Response, next: NextFunction) =>
        this.authorization.authenticateUser(req, res, next),
      (req: Request, res: Response) =>
        this.serviceTypeController.getAllServiceTypes(req, res, apiId + "01")
    );
    app.route(`${baseUrl}/service-types/create`).post(
      (req: Request, res: Response, next: NextFunction) =>
        this.authorization.authenticateUser(req, res, next),
      (req: Request, res: Response) =>
        this.serviceTypeController.createServiceType(req, res, apiId + "02")
    );
    app.route(`${baseUrl}/service-types/update/:id`).put(
      (req: Request, res: Response, next: NextFunction) =>
        this.authorization.authenticateUser(req, res, next),
      (req: Request, res: Response) =>
        this.serviceTypeController.updateServiceType(req, res, apiId + "03")
    );
    app.route(`${baseUrl}/service-types/delete/:id`).delete(
      (req: Request, res: Response, next: NextFunction) =>
        this.authorization.authenticateUser(req, res, next),
      (req: Request, res: Response) =>
        this.serviceTypeController.deleteServiceType(req, res, apiId + "04")
    );
    app.route(`${baseUrl}/service-types/:id`).get(
      (req: Request, res: Response, next: NextFunction) =>
        this.authorization.authenticateUser(req, res, next),
      (req: Request, res: Response) =>
        this.serviceTypeController.getServiceTypeById(req, res, apiId + "05")
    );
  }
}

export default ServiceTypeRoute;
