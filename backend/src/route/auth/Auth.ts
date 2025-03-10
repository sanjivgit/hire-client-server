import express, { Request, Response } from "express";
import { baseUrl } from "../../utils/common";
import AuthController from "../../controller/auth/Login";

class AuthRoute {
  private authController: AuthController;
  constructor() {
    this.authController = new AuthController();
  }

  configure(app: express.Application, apiId: string) {
    app
      .route(`${baseUrl}/auth/login`)
      .post((req: Request, res: Response) =>
        this.authController.login(req, res, apiId + "01")
      );
    app
      .route(`${baseUrl}/auth/register`)
      .post((req: Request, res: Response) =>
        this.authController.registration(req, res, apiId + "02")
      );
    app
      .route(`${baseUrl}/auth/phone/send-otp`)
      .post((req: Request, res: Response) =>
        this.authController.sendPhoneOtp(req, res, apiId + "03")
      );
    app
      .route(`${baseUrl}/auth/phone/verify-otp`)
      .post((req: Request, res: Response) =>
        this.authController.verifyPhoneOtp(req, res, apiId + "04")
      );
    app
      .route(`${baseUrl}/auth/mail/send-otp`)
      .post((req: Request, res: Response) =>
        this.authController.sendMailOtp(req, res, apiId + "05")
      );
    app
      .route(`${baseUrl}/auth/mail/verify-otp`)
      .post((req: Request, res: Response) =>
        this.authController.verifyMailOtp(req, res, apiId + "06")
      );
      app
      .route(`${baseUrl}/auth/forget-password`)
      .post((req: Request, res: Response) =>
        this.authController.forget(req, res, apiId + "07")
      );
  }
}

export default AuthRoute;
