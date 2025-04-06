import multer from "multer";
import path from "path";
import fs from "fs";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config";

// Create uploads directory if it doesn't exist
const uploadDir = "public/uploads";
const profilePicsDir = `${uploadDir}/profile-pics`;
const documentsDir = `${uploadDir}/documents`;
const iconsDir = `${uploadDir}/icons`;

[uploadDir, profilePicsDir, documentsDir].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Configure storage
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const fileFor = req.query.fileFor;
    const dest = fileFor === "profilePic" ? profilePicsDir : fileFor === "document" ? documentsDir : iconsDir;
    const token: string = req.headers["authorization"]?.split(" ")[1] || "";
    const decoded: any = await jwt.verify(token, SECRET_KEY);
   
    const userId = decoded?.authData?.id || "unknown";

    const destDir = fileFor === 'document' ? `${dest}/${userId}` : dest;

    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    cb(null, destDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

// File filter
const fileFilter = (
  req: any,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const fileFor = req.query.fileFor;
  
  if (fileFor === "profilePic") {
    // Allow only image files for profile pictures
    if (!file.mimetype.startsWith("image/")) {
      return cb(
        new Error("Only image files are allowed for profile pictures!")
      );
    }
    // Check specific image types
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(
        new Error(
          "Only JPG, JPEG, and PNG files are allowed for profile pictures!"
        )
      );
    }
  } else if (fileFor === "document") {
    // Allow only PDF files for documents
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF files are allowed for documents!"));
    }
  }
  cb(null, true);
};

// Create multer upload instance
const multerUpload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
}).single("file");

export default multerUpload;
