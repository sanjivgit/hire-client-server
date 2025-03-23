import express, { NextFunction, Request, Response } from "express";
import AcceptedServiceController from "../controller/acceptedService/acceptedServiceController";
import Authorization from "../middleware/auth";

const baseUrl = "/api/v1";

class AcceptedServiceRoute {
  private acceptedServiceController: AcceptedServiceController;
  private authorization: Authorization;

  constructor() {
    this.acceptedServiceController = new AcceptedServiceController();
    this.authorization = new Authorization();
  }

  configure(app: express.Application, apiId: string) {
    // Accept a service request
    app.route(`${baseUrl}/accepted-services/accept`).post(
      (req: Request, res: Response, next: NextFunction) =>
        this.authorization.authenticateUser(req, res, next),
      (req: Request, res: Response) =>
        this.acceptedServiceController.acceptServiceRequest(req, res, apiId + "01")
    );

    // Update an accepted service (status, amount, description)
    app.route(`${baseUrl}/accepted-services/update/:id`).put(
      (req: Request, res: Response, next: NextFunction) =>
        this.authorization.authenticateUser(req, res, next),
      (req: Request, res: Response) =>
        this.acceptedServiceController.updateAcceptedService(req, res, apiId + "02")
    );

    // Get all accepted services for the authenticated partner
    app.route(`${baseUrl}/accepted-services/partner`).get(
      (req: Request, res: Response, next: NextFunction) =>
        this.authorization.authenticateUser(req, res, next),
      (req: Request, res: Response) =>
        this.acceptedServiceController.getAcceptedServicesByPartnerId(req, res, apiId + "03")
    );

    // Get all accepted services with filters
    app.route(`${baseUrl}/accepted-services`).get(
      (req: Request, res: Response, next: NextFunction) =>
        this.authorization.authenticateUser(req, res, next),
      (req: Request, res: Response) =>
        this.acceptedServiceController.getAllAcceptedServices(req, res, apiId + "04")
    );

    // Get a specific accepted service by ID
    app.route(`${baseUrl}/accepted-services/:id`).get(
      (req: Request, res: Response, next: NextFunction) =>
        this.authorization.authenticateUser(req, res, next),
      (req: Request, res: Response) =>
        this.acceptedServiceController.getAcceptedServiceById(req, res, apiId + "05")
    );
  }
}

export default AcceptedServiceRoute; 