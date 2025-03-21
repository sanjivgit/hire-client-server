import express, { NextFunction, Request, Response } from "express";
import { baseUrl } from "../../utils/common";
import UserController from "../../controller/user/user";
import Authorization from "../../middleware/auth";

class UserRoute {
  private userController: UserController;
  private authorization: Authorization;
  constructor() {
    this.userController = new UserController();
    this.authorization = new Authorization();
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
  }
}

export default UserRoute;
