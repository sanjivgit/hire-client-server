import express, { NextFunction, Request, Response } from "express";
import { baseUrl } from "../utils/common";
import Authorization from "../middleware/auth";
import ServiceController from "../controller/service/serviceController";

class ServiceRoute {
  private serviceController: ServiceController;
  private authorization: Authorization;
  constructor() {
    this.serviceController = new ServiceController();
    this.authorization = new Authorization();
  }

  configure(app: express.Application, apiId: string) {
    app.route(`${baseUrl}/services`).get(
      (req: Request, res: Response, next: NextFunction) =>
        this.authorization.authenticateUser(req, res, next),
      (req: Request, res: Response) =>
        this.serviceController.getAllServices(req, res, apiId + "01")
    );
    app.route(`${baseUrl}/services/create`).post(
      (req: Request, res: Response, next: NextFunction) =>
        this.authorization.authenticateUser(req, res, next),
      (req: Request, res: Response) =>
        this.serviceController.createService(req, res, apiId + "02")
    );
    app.route(`${baseUrl}/services/update/:id`).put(
      (req: Request, res: Response, next: NextFunction) =>
        this.authorization.authenticateUser(req, res, next),
      (req: Request, res: Response) =>
        this.serviceController.updateService(req, res, apiId + "03")
    );
    app.route(`${baseUrl}/services/delete/:id`).delete(
      (req: Request, res: Response, next: NextFunction) =>
        this.authorization.authenticateUser(req, res, next),
      (req: Request, res: Response) =>
        this.serviceController.deleteService(req, res, apiId + "04")
    );
    app.route(`${baseUrl}/services/:id`).get(
      (req: Request, res: Response, next: NextFunction) =>
        this.authorization.authenticateUser(req, res, next),
      (req: Request, res: Response) =>
        this.serviceController.getServiceById(req, res, apiId + "05")
    );
    app.route(`${baseUrl}/services/by-service-type/:serviceTypeId`).get(
      (req: Request, res: Response, next: NextFunction) =>
        this.authorization.authenticateUser(req, res, next),
      (req: Request, res: Response) =>
        this.serviceController.getServicesByTypeId(req, res, apiId + "06")
    );
  }
}

export default ServiceRoute;
