import express, { NextFunction, Request, Response } from "express";
import { baseUrl } from "../../utils/common";
import PartnerController from "../../controller/partner/partner";
import Authorization from "../../middleware/auth";

class PartnerRoute {
  private partnerController: PartnerController;
  private authorization: Authorization;
  constructor() {
    this.partnerController = new PartnerController();
    this.authorization = new Authorization();
  }

  configure(app: express.Application, apiId: string) {
    // Create partner
    app.route(`${baseUrl}/partner/partner-registration`).post(
      (req: Request, res: Response, next: NextFunction) =>
        this.authorization.authenticateUser(req, res, next),
      (req: Request, res: Response) =>
        this.partnerController.becomePartner(req, res, apiId + "01")
    );

    // Update partner
    app.route(`${baseUrl}/partner/update`).put(
      (req: Request, res: Response, next: NextFunction) =>
        this.authorization.authenticateUser(req, res, next),
      (req: Request, res: Response) =>
        this.partnerController.updatePartner(req, res, apiId + "02")
    );

    // Get partner by ID
    app.route(`${baseUrl}/partner/:id`).get(
      (req: Request, res: Response, next: NextFunction) =>
        this.authorization.authenticateUser(req, res, next),
      (req: Request, res: Response) =>
        this.partnerController.getPartnerById(req, res, apiId + "03")
    );
  }
}

export default PartnerRoute;
