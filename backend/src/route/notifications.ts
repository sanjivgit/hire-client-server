import express, { NextFunction, Request, Response } from "express";
import NotificationsController from "../controller/notifications/notificationsController";
import Authorization from "../middleware/auth";

const baseUrl = "/api/v1";

class NotificationsRoute {
  private notificationsController: NotificationsController;
  private authorization: Authorization;

  constructor() {
    this.notificationsController = new NotificationsController();
    this.authorization = new Authorization();
  }

  configure(app: express.Application, routePrefix: string) {
    // Get notifications based on location and user's own service requests
    app.route(`${baseUrl}/user/notifications`).get(
      (req: Request, res: Response, next: NextFunction) =>
        this.authorization.authenticateUser(req, res, next),
      (req: Request, res: Response) =>
        this.notificationsController.getNotifications(req, res, routePrefix + "01")
    );

    app.route(`${baseUrl}/user/notification-counts`).get(
      (req: Request, res: Response, next: NextFunction) =>
        this.authorization.authenticateUser(req, res, next),
      (req: Request, res: Response) =>
        this.notificationsController.getNotificationCount(req, res, routePrefix + "02")
    );
  }
}

export default NotificationsRoute; 