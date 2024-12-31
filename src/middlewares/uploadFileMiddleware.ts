import multer from "multer";
import configuracionMulter from "../utils/configurationMulter";
import { NextFunction, Request, Response } from "express";

const upload = multer(configuracionMulter).single("image");

export const uploadFileMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  upload(req, res, function (error) {
    const err = error as Error;
    if (err) {
      return res.status(400).json(err.message);
    }
    next();
  });
};
