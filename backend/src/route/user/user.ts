import express, { NextFunction, Request, Response } from "express";
import { baseUrl } from "../../utils/common";
import UserController from "../../controller/user/user";
import Middleware from "../../middleware/middleware";

class UserRoute {
  private userController: UserController;
  private middleware: Middleware;
  constructor() {
    this.userController = new UserController();
    this.middleware = new Middleware();
  }

  configure(app: express.Application, apiId: string) {
    app.route(`${baseUrl}/user/details`).get(
      (req: Request, res: Response, next: NextFunction) =>
        this.middleware.jwtVerify(req, res, next),
      (req: Request, res: Response) =>
        this.userController.getUserDetails(req, res, apiId + "01")
    );
  }
}

export default UserRoute;
