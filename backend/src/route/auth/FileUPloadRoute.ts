import express, { NextFunction, Request, Response } from "express";
import FileUploadController from "../../controller/FileUploadController";
import { baseUrl } from "../../utils/common";
import Authorization from "../../middleware/auth";
import multerUpload from "../../middleware/_multer";

class FileUploadRoute {
  private fileUploadController: FileUploadController;
  private authorization: Authorization;
  private routeName: string;
  constructor() {
    this.fileUploadController = new FileUploadController();
    this.authorization = new Authorization();
    this.routeName = "file/upload";
  }

  configure(app: express.Application, apiId: string) {
    app.route(`${baseUrl}/${this.routeName}`).post(
      (req: Request, res: Response, next: NextFunction) =>
        this.authorization.authenticateUser(req, res, next),
      (req: Request, res: Response) =>
        this.fileUploadController.uploadSingleDocument(req, res, apiId + "01")
    );
  }
}

export default FileUploadRoute;
