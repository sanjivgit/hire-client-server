import { Request, Response } from "express";
import CommonRes from "../utils/commonResponse";
import { resObj } from "../utils/types";
import multerUpload from "../middleware/_multer";
import FileDao from "../dao/file/fileDao";
import path from "path";
import fs from "fs";

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

  getFileById = async (req: Request, res: Response, apiId: string) => {
    const resObj: resObj = {
      apiId,
      action: "GET",
      version: "1.0",
    };

    try {
      const userId = String(req.body.user.id);
      const fileId = parseInt(req.params.id);
      
      if (isNaN(fileId)) {
        CommonRes.BAD_REQUEST(
          "Invalid file ID",
          resObj,
          req,
          res
        );
        return;
      }

      // Get file details from the database
      const fileData = await this.fileDao.getFileById(fileId);
      
      if (!fileData) {
        CommonRes.NOT_FOUND(
          "File not found",
          null,
          resObj,
          req,
          res
        );
        return;
      }

      // Determine the file path based on file type
      const publicDir = path.join(process.cwd(), 'public');
      let filePath;
      
      // Check if the file is an image or document based on extension
      const fileExtension = path.extname(fileData.file_path).toLowerCase();
      const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif'];

      if (imageExtensions.includes(fileExtension)) {
        // For images, check in profile-pics folder
        filePath = path.join(publicDir, 'uploads', 'profile-pics', fileData.file_path);

        // If not found in profile-pics, check documents as fallback
        if (!fs.existsSync(filePath)) {
          filePath = path.join(publicDir, 'uploads', 'documents', userId, fileData.file_path);
        }
      } else {
        // For documents, check in documents folder first
        filePath = path.join(publicDir, 'uploads', 'documents', userId, fileData.file_path);
        
        // If not found in documents, check profile-pics as fallback
        if (!fs.existsSync(filePath)) {
          filePath = path.join(publicDir, 'uploads', 'profile-pics', fileData.file_path);
        }
      }

      // Check if the file exists
      if (!fs.existsSync(filePath)) {
        CommonRes.NOT_FOUND(
          "File exists in database but physical file not found",
          null,
          resObj,
          req,
          res
        );
        return;
      }

      // Get file extension to determine content type
      let contentType = 'application/octet-stream'; // Default content type

      // Set the correct content type based on file extension
      switch (fileExtension) {
        case '.jpg':
        case '.jpeg':
          contentType = 'image/jpeg';
          break;
        case '.png':
          contentType = 'image/png';
          break;
        case '.gif':
          contentType = 'image/gif';
          break;
        case '.pdf':
          contentType = 'application/pdf';
          break;
        case '.doc':
        case '.docx':
          contentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
          break;
        case '.txt':
          contentType = 'text/plain';
          break;
      }

      // Set headers for the response
      res.setHeader('Content-Type', contentType);
      res.setHeader('Content-Disposition', `inline; filename="${fileData.file_path}"`);

      // Stream the file
      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);
      
    } catch (error: any) {
      CommonRes.SERVER_ERROR(error, resObj, req, res);
    }
  };

  getFileByIdWithoutToken = async (req: Request, res: Response, apiId: string) => {
    const resObj: resObj = {
      apiId,
      action: "GET",
      version: "1.0",
    };

    try {
      const fileId = parseInt(req.params.id);
      
      if (isNaN(fileId)) {
        CommonRes.BAD_REQUEST(
          "Invalid file ID",
          resObj,
          req,
          res
        );
        return;
      }

      // Get file details from the database
      const fileData = await this.fileDao.getFileById(fileId);
      
      if (!fileData) {
        CommonRes.NOT_FOUND(
          "File not found",
          null,
          resObj,
          req,
          res
        );
        return;
      }

      // Determine the file path based on file type
      const publicDir = path.join(process.cwd(), 'public');
      let filePath;
      
      // Check if the file is an image or document based on extension
      const fileExtension = path.extname(fileData.file_path).toLowerCase();

      filePath = path.join(publicDir, 'uploads', 'icons', fileData.file_path);

      // If not found in documents, check profile-pics as fallback
      if (!fs.existsSync(filePath)) {
        filePath = path.join(publicDir, 'uploads', 'profile-pics', fileData.file_path);
      }

      // Check if the file exists
      if (!fs.existsSync(filePath)) {
        CommonRes.NOT_FOUND(
          "File exists in database but physical file not found",
          null,
          resObj,
          req,
          res
        );
        return;
      }

      // Get file extension to determine content type
      let contentType = 'application/octet-stream'; // Default content type

      // Set the correct content type based on file extension
      switch (fileExtension) {
        case '.jpg':
        case '.jpeg':
          contentType = 'image/jpeg';
          break;
        case '.png':
          contentType = 'image/png';
          break;
        case '.gif':
          contentType = 'image/gif';
          break;
        case '.pdf':
          contentType = 'application/pdf';
          break;
        case '.doc':
        case '.docx':
          contentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
          break;
        case '.txt':
          contentType = 'text/plain';
          break;
      }

      // Set headers for the response
      res.setHeader('Content-Type', contentType);
      res.setHeader('Content-Disposition', `inline; filename="${fileData.file_path}"`);

      // Stream the file
      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);
      
    } catch (error: any) {
      CommonRes.SERVER_ERROR(error, resObj, req, res);
    }
  };
}

export default FileUploadController;
