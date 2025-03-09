import express, { Request, Response } from "express";
// import FileUploadController from "@controlle/FileUploadController";
import { baseUrl } from "../../utils/common";

class FileUploadRoute {
  // private fileUploadController: FileUploadController;
  private routeName: string;
  constructor() {
    // this.fileUploadController = new FileUploadController();
    this.routeName = "upload";
  }

  configure(app: express.Application, apiId: string) {
    // app
    //   .route(`${baseUrl}/${this.routeName}/:testPaperId`)
    //   .post((req: Request, res: Response) =>
    //     this.fileUploadController.uploadSingleDocument(req, res, apiId + "01")
    //   );
  }
}

export default FileUploadRoute;
