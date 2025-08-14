import express, { NextFunction, Request, Response } from "express";
import { baseUrl } from "../../utils/common";
import UserController from "../../controller/user/user";
import Authorization from "../../middleware/auth";
import UserMiddleware from "../../middleware/userMiddleware";

class UserRoute {
  private userController: UserController;
  private authorization: Authorization;
  private userMiddleware: UserMiddleware;
  constructor() {
    this.userController = new UserController();
    this.authorization = new Authorization();
    this.userMiddleware = new UserMiddleware();
  }

  configure(app: express.Application, apiId: string) {
    app.route(`${baseUrl}/user/details`).get(
      (req: Request, res: Response, next: NextFunction) =>
        this.authorization.authenticateUser(req, res, next),
      (req: Request, res: Response) =>
        this.userController.getUserDetails(req, res, apiId + "01")
    );
    app.route(`${baseUrl}/user/update`).put(
      (req: Request, res: Response, next: NextFunction) =>
        this.authorization.authenticateUser(req, res, next),
      (req: Request, res: Response) =>
        this.userController.updateUserDetails(req, res, apiId + "02")
    );

    app.route(`${baseUrl}/user/get-list`).get(
      (req: Request, res: Response, next: NextFunction) =>
        this.authorization.authenticateUser(req, res, next),
      (req: Request, res: Response) =>
        this.userController.getUserList(req, res, apiId + "03")
    );

    app.param(`userId`, this.userMiddleware.extractUserId);
    app.route(`${baseUrl}/user/get-history/:userId`).get(
      (req: Request, res: Response, next: NextFunction) => {
        this.authorization.jwtVerifyIsAdmin(req, res, next)
      },
      (req: Request, res: Response) =>
        this.userController.getUserServiceHistory(req, res, apiId + "04")
    );
  }
}

export default UserRoute;
