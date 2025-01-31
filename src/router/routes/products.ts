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

productsRouter.use(authorization);
productsRouter.param("id", validateObjectIdMiddleware);

productsRouter.post("/", newProductValidations, createProductController);
productsRouter.get("/", getProductsController);
productsRouter.get("/:id", getProductByIdController);
productsRouter.patch("/:id", patchProductValidations, updateProductController);
productsRouter.delete("/:id", deleteProductController);

export default productsRouter;
