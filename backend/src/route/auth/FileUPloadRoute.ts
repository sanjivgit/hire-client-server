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
    this.routeName = "file";
  }

  configure(app: express.Application, apiId: string) {
    // Upload a file
    app.route(`${baseUrl}/${this.routeName}/upload`).post(
      (req: Request, res: Response, next: NextFunction) =>
        this.authorization.authenticateUser(req, res, next),
      (req: Request, res: Response) =>
        this.fileUploadController.uploadSingleDocument(req, res, apiId + "01")
    );

    // Get a file by ID
    app.route(`${baseUrl}/${this.routeName}/:id`).get(
      (req: Request, res: Response, next: NextFunction) =>
        this.authorization.authenticateUser(req, res, next),
      (req: Request, res: Response) => {
        this.fileUploadController.getFileById(req, res, apiId + "02");
      }
    );

    // Get a file by ID
    app.route(`${baseUrl}/${this.routeName}-without-token/:id`).get(
      (req: Request, res: Response) => {
        this.fileUploadController.getFileByIdWithoutToken(req, res, apiId + "03");
      }
    );
  }
}

export default FileUploadRoute;
