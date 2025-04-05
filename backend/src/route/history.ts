import express, { NextFunction, Request, Response } from "express";
import { baseUrl } from "../utils/common";
import HistoryController from "../controller/history/historyController";
import Authorization from "../middleware/auth";

class HistoryRoute {
  private historyController: HistoryController;
  private authorization: Authorization;
  
  constructor() {
    this.historyController = new HistoryController();
    this.authorization = new Authorization();
  }

  configure(app: express.Application, apiId: string) {
    // Get user service history (both requests and accepted services)
    app.route(`${baseUrl}/user/service-history`).get(
      (req: Request, res: Response, next: NextFunction) =>
        this.authorization.authenticateUser(req, res, next),
      (req: Request, res: Response) =>
        this.historyController.getUserServiceHistory(req, res, apiId + "01")
    );
  }
}

export default HistoryRoute; 