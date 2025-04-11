import express, { NextFunction, Request, Response } from "express";
import FcmTokenController from "../../controller/user/fcmTokenController";
import Authorization from "../../middleware/auth";

const baseUrl = "/api/v1/user";

class FcmTokenRoute {
  private fcmTokenController: FcmTokenController;
  private authorization: Authorization;

  constructor() {
    this.fcmTokenController = new FcmTokenController();
    this.authorization = new Authorization();
  }

  configure(app: express.Application, routePrefix: string) {
    // Store or update FCM token
    app.route(`${baseUrl}/fcm-token`).post(
      (req: Request, res: Response, next: NextFunction) =>
        this.authorization.authenticateUser(req, res, next),
      (req: Request, res: Response) =>
        this.fcmTokenController.storeToken(req, res, routePrefix + "01")
    );

    // Get all FCM tokens for the user
    app.route(`${baseUrl}/fcm-token`).get(
      (req: Request, res: Response, next: NextFunction) =>
        this.authorization.authenticateUser(req, res, next),
      (req: Request, res: Response) =>
        this.fcmTokenController.getTokens(req, res, routePrefix + "02")
    );

    // Update FCM token update
    app.route(`${baseUrl}/fcm-token/update`).put(
      (req: Request, res: Response, next: NextFunction) =>
        this.authorization.authenticateUser(req, res, next),
      (req: Request, res: Response) =>
        this.fcmTokenController.updateToken(req, res, routePrefix + "03")
    );

    // Delete FCM token
    app.route(`${baseUrl}/fcm-token/delete`).post(
      (req: Request, res: Response, next: NextFunction) =>
        this.authorization.authenticateUser(req, res, next),
      (req: Request, res: Response) =>
        this.fcmTokenController.deleteToken(req, res, routePrefix + "04")
    );
  }
}

export default FcmTokenRoute; 