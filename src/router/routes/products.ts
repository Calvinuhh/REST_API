import { Router } from "express";
import {
  getProductsController,
  createProductController,
  getProductByIdController,
  deleteProductController,
  updateProductController,
} from "../../controllers/productsController";
import { newProductValidations } from "../../middlewares/newProductMiddleware";
import { validateObjectIdMiddleware } from "../../middlewares/objectIdValidation";
import { patchProductValidations } from "../../middlewares/updateMiddlewares";
import { authorization } from "../../middlewares/authorization";

const productsRouter: Router = Router();

productsRouter.post(
  "/",
  authorization,
  newProductValidations,
  createProductController
);

productsRouter.get("/", authorization, getProductsController);

productsRouter.get(
  "/:id",
  authorization,
  validateObjectIdMiddleware,
  getProductByIdController
);

productsRouter.patch(
  "/:id",
  authorization,
  patchProductValidations,
  updateProductController
);

productsRouter.delete(
  "/:id",
  authorization,
  validateObjectIdMiddleware,
  deleteProductController
);

export default productsRouter;
