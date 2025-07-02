import express, { NextFunction, Request, Response } from "express";
import ServiceRequestController from "../controller/serviceRequest/serviceRequestController";
import Authorization from "../middleware/auth";

const baseUrl = "/api/v1";

class ServiceRequestRoute {
  private serviceRequestController: ServiceRequestController;
  private authorization: Authorization;

  constructor() {
    this.serviceRequestController = new ServiceRequestController();
    this.authorization = new Authorization();
  }

  configure(app: express.Application, apiId: string) {
    // Create a service request
    app.route(`${baseUrl}/service-requests/create`).post(
      (req: Request, res: Response, next: NextFunction) =>
        this.authorization.authenticateUser(req, res, next),
      (req: Request, res: Response) =>
        this.serviceRequestController.createServiceRequest(req, res, apiId + "01")
    );

    // Delete a service request
    app.route(`${baseUrl}/service-requests/delete/:id`).delete(
      (req: Request, res: Response, next: NextFunction) =>
        this.authorization.authenticateUser(req, res, next),
      (req: Request, res: Response) =>
        this.serviceRequestController.deleteServiceRequest(req, res, apiId + "02")
    );

    // Get all service requests for the authenticated user
    app.route(`${baseUrl}/service-requests/user`).get(
      (req: Request, res: Response, next: NextFunction) =>
        this.authorization.authenticateUser(req, res, next),
      (req: Request, res: Response) =>
        this.serviceRequestController.getServiceRequestsByUserId(req, res, apiId + "03")
    );

    // Get all service requests (admin access)
    app.route(`${baseUrl}/service-requests`).get(
      (req: Request, res: Response, next: NextFunction) =>
        this.authorization.authenticateUser(req, res, next),
      (req: Request, res: Response) =>
        this.serviceRequestController.getAllServiceRequests(req, res, apiId + "04")
    );

    // Get a specific service request by ID
    app.route(`${baseUrl}/service-requests/:id`).get(
      (req: Request, res: Response, next: NextFunction) =>
        this.authorization.authenticateUser(req, res, next),
      (req: Request, res: Response) =>
        this.serviceRequestController.getServiceRequestById(req, res, apiId + "05")
    );

    app.route(`${baseUrl}/service-requests/cancel/:id`).post(
      (req: Request, res: Response, next: NextFunction) =>
        this.authorization.authenticateUser(req, res, next),
      (req: Request, res: Response) => this.serviceRequestController.cancelServiceRequest(req, res, apiId + "06")
    );
  }
}

export default ServiceRequestRoute; 