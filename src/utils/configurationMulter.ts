import multer from "multer";
import shortid from "shortid";
import { Request } from "express";
import path from "path";

const configuracionMulter = {
  storage: multer.diskStorage({
    destination: (req: Request, file, cb) => {
      cb(null, path.join(__dirname, "../uploads/"));
    },
    filename: (req: Request, file, cb) => {
      const extension = file.mimetype.split("/")[1];
      cb(null, `${shortid.generate()}.${extension}`);
    },
  }),
  fileFilter(
    req: Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback
  ) {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(new Error("Formato No válido"));
    }
  },
};

export default configuracionMulter;
