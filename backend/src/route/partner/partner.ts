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
    app.route(`${baseUrl}/partner/partner-registration`).post(
      (req: Request, res: Response, next: NextFunction) =>
        this.authorization.authenticateUser(req, res, next),
      (req: Request, res: Response) =>
        this.partnerController.becomePartner(req, res, apiId + "01")
    );
  }
}

export default PartnerRoute;
