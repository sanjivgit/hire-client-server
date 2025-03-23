import { Request, Response } from "express";
import CommonRes from "../utils/commonResponse";
import { resObj } from "../utils/types";
import multerUpload from "../middleware/_multer";
import FileDao from "../dao/file/fileDao";

class FileUploadController {
  private fileDao: FileDao;

  constructor() {
    this.fileDao = new FileDao();
  }

  uploadSingleDocument = async (req: Request, res: Response, apiId: string) => {
    const resObj: resObj = {
      apiId,
      action: "GET",
      version: "1.0",
    };

    multerUpload(req, res, async (error) => {
      if (error) {
        return CommonRes.SERVER_ERROR(error, resObj, req, res);
      } else {
        if (!req.file) {
          return CommonRes.SUCCESS("No file uploaded", null, resObj, req, res);
        }

        const file = await this.fileDao.createFile({
          file_path: req.file.filename,
        });

        return CommonRes.SUCCESS(
          "File Uploaded Successfully",
          file,
          resObj,
          req,
          res
        );
      }
    });
  };
}

export default FileUploadController;
