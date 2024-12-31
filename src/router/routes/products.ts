import { Router } from "express";
import {
  getProductsController,
  createProductController,
  getProductByIdController,
  deleteProductController,
  updateProductController,
} from "../../controllers/productsController";
import { newProductValidations } from "../../middlewares/newProductMiddleware";
import { uploadFileMiddleware } from "../../middlewares/uploadFileMiddleware";
import { validateObjectIdMiddleware } from "../../middlewares/objectIdValidation";
import { patchProductValidations } from "../../middlewares/updateMiddlewares";

const productsRouter: Router = Router();

productsRouter.post(
  "/",
  uploadFileMiddleware,
  newProductValidations,
  createProductController
);

productsRouter.get("/", getProductsController);

productsRouter.get(
  "/:id",
  validateObjectIdMiddleware,
  getProductByIdController
);

productsRouter.patch(
  "/:id",
  uploadFileMiddleware,
  patchProductValidations,
  updateProductController
);

productsRouter.delete(
  "/:id",
  validateObjectIdMiddleware,
  deleteProductController
);

export default productsRouter;
